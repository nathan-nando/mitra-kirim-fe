"use server"

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest, { params }: { params: { file: string[] } }) {
    try {
        const {file}  = await params
        // Extract the file path from the URL
        const filePath = file.join('/');
        console.log(filePath)

        // Construct the full path to the image
        const fullPath = path.join('/home/nathan/mk-storage/assets', filePath);
        console.log( fullPath)
        // Check if the file exists
        if (!fs.existsSync(fullPath)) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        // Determine the MIME type based on the file extension
        const mimeType = getMimeType(fullPath);

        // Create a ReadStream for the file
        const fileStream = fs.createReadStream(fullPath);

        // Convert the ReadStream to a ReadableStream
        const readableStream = new ReadableStream({
            start(controller) {
                fileStream.on('data', (chunk) => {
                    controller.enqueue(chunk);
                });
                fileStream.on('end', () => {
                    controller.close();
                });
                fileStream.on('error', (err) => {
                    controller.error(err);
                });
            },
        });

        // Return the file as a streaming response
        return new Response(readableStream, {
            headers: {
                'Content-Type': mimeType,
            },
        });
    } catch (error) {
        console.error('Error serving image:', error);
        return NextResponse.json({ error: 'Failed to serve image' }, { status: 500 });
    }
}

// Helper function to determine MIME type based on file extension
function getMimeType(filePath: string): string {
    const extension = path.extname(filePath).toLowerCase();
    switch (extension) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.gif':
            return 'image/gif';
        case '.webp':
            return 'image/webp';
        default:
            return 'application/octet-stream'; // Fallback MIME type
    }
}
