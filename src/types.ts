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
  url?: string;
  mimeType:
    | 'image/png'
    | 'image/jpeg'
    | 'image/gif'
    | 'application/pdf'
    | 'application/zip'
    | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  usage: 'internal' | 'external';
  floorPlan?: string | null;
  parentFolderId?: string | null;
  createdAt: number;
  updatedAt: number;
}
