export type FilterType = "lipstick" | "blush" | "brow";

export interface Product {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  category: "makeup" | "hair";
  filterType: FilterType | null;
  filterColor: string | null;
  shade: string | null;
  imageUrl: string;
  stock: number;
  featured: boolean;
}

export interface CourseListItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  priceCents: number;
  coverUrl: string;
  level: string;
  lessonCount: number;
}

export interface Lesson {
  id: string;
  title: string;
  durationLabel: string;
  order: number;
  freePreview: boolean;
  videoUrl: string | null;
  locked: boolean;
}

export interface Course extends CourseListItem {
  description: string;
  enrolled: boolean;
  lessons: Lesson[];
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  enrolledCourseIds?: string[];
}

export interface OrderItem {
  id: string;
  kind: "product" | "course";
  name: string;
  priceCents: number;
  quantity: number;
}

export interface Order {
  id: string;
  totalCents: number;
  status: string;
  customerName: string;
  address: string;
  city: string;
  phone: string;
  createdAt: string;
  items: OrderItem[];
}

export interface LibraryEntry {
  enrolledAt: string;
  course: Pick<CourseListItem, "id" | "slug" | "title" | "summary" | "coverUrl">;
}
