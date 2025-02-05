// import { verifyToken } from '$lib/server/jwt';
import prisma from '$lib/server/prisma';
import { Decimal } from '@prisma/client/runtime/library';
import type { RequestHandler } from '@sveltejs/kit';
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});




export const POST: RequestHandler = async ({ request }) => {
    // const token = request.headers.get('Authorization');
    // if(token && verifyToken(token)){
    const data = await request.formData();

    const name = data.get('name') as string;
    const price = new Decimal(data.get('price') as string);
    const description = data.get('description') as string;
    const tag = data.get('tag') as string;
    const size = data.get('size') as string;
    const categoryId = Number(data.get('category') as string) > 0 ? Number(data.get('category') as string) : null;
    
    const picture: File[] = [];

    const picturesResult: any[] = [];

    // Iterar sobre os itens do FormData
    data.forEach((value, key) => {
      console.log(data);
      if (key === 'picture' && value instanceof File) {
        picture.push(value);
      }
    });    
    console.log(picture);

    if (!picture) {
      return new Response('No file uploaded', { status: 400 });
    }
    
for (const element of picture) {
  const buffer = Buffer.from(await element.arrayBuffer());
  const result: any = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'dl_imports' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  
    // Send the buffer to Cloudinary
    uploadStream.end(buffer);
  });
  console.log(result);
  picturesResult.push(result.secure_url);
  console.log(picturesResult);
}

console.log(picturesResult);

  // Criar o novo produto
  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      tag,
      price,
      size,
      pictures: {
        create: picturesResult.map((url) => ({
          namePath: url,
        })),
      },
    },
    include: {
      pictures: true, // Incluir as imagens associadas no retorno
    },
  });

// for (const element of picturesResult) {
//   await prisma.pictures.create({
//     data: { productId: newProduct.id, namePath: element }
//   });
// }

return new Response(JSON.stringify({ product: newProduct }), { status: 201 });

//   }else{
//     return new Response(JSON.stringify({ message: 'Não autorizado' }), { status: 401 });
  
//   }
  };