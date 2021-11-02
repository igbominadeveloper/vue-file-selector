export interface Directory {
  id?: string;
  name?: string;
  parentFolderId?: string | null;
  createdAt?: number;
  updatedAt?: number;
  files: File[];
  folders: Directory[];
}

export interface File {
  id: string;
  name: string;
  url: string;
  mimeType: MimeType;
  usage: 'internal';
  floorPlan: null;
  parentFolderId: null;
  createdAt: number;
  updatedAt: number;
}

export enum MimeType {
  ImagePng = 'image/png',
  ImageJpeg = 'image/jpeg',
  ImageGif = 'image/gif',
  Zip = 'application/zip',
  Doc = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  Sheet = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}
