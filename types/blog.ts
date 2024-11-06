export type Tag = {
  name: string;
  // 他に必要なフィールドがあれば追加
};

export type Thumbnail = {
  url: string;
  height?: number;
  width?: number;
};

export type BlogType = {
  id: string;
  publishedAt: string;
  title: string;
  description: string;
  content: string;
  tags: Tag[]; // タグの配列に変更
  thumbnail: Thumbnail;
  link: string;
};
