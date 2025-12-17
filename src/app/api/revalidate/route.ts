import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Check for secret to confirm this is a valid request
    const secret = body.secret || request.headers.get('x-sanity-webhook-secret')

    if (secret !== process.env.SANITY_REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    // Get the document type from the webhook payload
    const documentType = body._type

    // Revalidate based on document type
    switch (documentType) {
      case 'work':
        // Revalidate homepage (shows all works)
        revalidatePath('/')
        // Revalidate all work detail pages
        revalidatePath('/work/[slug]', 'page')
        break

      case 'page':
        // Revalidate specific static pages
        const pageId = body.pageId
        if (pageId === 'about') {
          revalidatePath('/about')
        } else if (pageId === 'archive') {
          revalidatePath('/archive')
        }
        break

      case 'siteSettings':
        // Revalidate all pages since settings appear in layout
        revalidatePath('/', 'layout')
        break

      case 'category':
        // Revalidate homepage and all work pages
        revalidatePath('/')
        revalidatePath('/work/[slug]', 'page')
        break

      default:
        // Revalidate everything if unsure
        revalidatePath('/', 'layout')
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: documentType
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}
