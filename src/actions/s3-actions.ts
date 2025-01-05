'use server';

import { S3Client, DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuid } from 'uuid';

const STORAGE_BUCKET_NAME = process.env.STORAGE_BUCKET_NAME!;
const STORAGE_REGION = process.env.STORAGE_REGION!;
const STORAGE_ACCESS_KEY_ID = process.env.STORAGE_ACCESS_KEY_ID!;
const STORAGE_SECRET_ACCESS_KEY = process.env.STORAGE_SECRET_ACCESS_KEY!;

export const s3Client = new S3Client({
  credentials: {
    accessKeyId: STORAGE_ACCESS_KEY_ID,
    secretAccessKey: STORAGE_SECRET_ACCESS_KEY,
  },
  region: STORAGE_REGION,
});

const uploadFileToS3 = async (file: File, isPublic = false): Promise<{ url?: string; key: string }> => {
  const key = `express-app/${file.name}${uuid()}`;
  const command = new PutObjectCommand({
    Bucket: STORAGE_BUCKET_NAME,
    Key: key,
    Body: Buffer.from(await file.arrayBuffer()),
    ...(isPublic && { ACL: 'public-read' }),
  });

  await s3Client.send(command);
  return isPublic ? { url: `https://${STORAGE_BUCKET_NAME}.s3.${STORAGE_REGION}.amazonaws.com/${key}`, key } : { key };
};

const deleteS3File = async (key: string) => {
  await s3Client.send(new DeleteObjectCommand({ Bucket: STORAGE_BUCKET_NAME, Key: key }));
  console.log(`Deleted S3 file with key: ${key}`);
};

export const getSignedUrlForS3File = async (key: string): Promise<string> =>
  getSignedUrl(s3Client, new GetObjectCommand({ Bucket: STORAGE_BUCKET_NAME, Key: key }), { expiresIn: 3600 });

export const uploadFileToS3Public = async (file: File) => await uploadFileToS3(file, true);
export const uploadFileToS3Private = async (file: File) => await uploadFileToS3(file);
export const deleteS3FileByKey = async (key: string) => {
  await s3Client.send(new DeleteObjectCommand({ Bucket: STORAGE_BUCKET_NAME, Key: key }));
  console.log(`Deleted S3 file with key: ${key}`);
};
export const deleteS3FileByUrl = async (url: string) => await deleteS3File(url.split('amazonaws.com/')[1]);
