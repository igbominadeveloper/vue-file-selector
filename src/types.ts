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
  mimeType: 'image/png' | 'image/jpeg' | 'application/pdf';
  usage: 'internal';
  floorPlan: string | null;
  parentFolderId: string | null;
  createdAt: number;
  updatedAt: number;
}
