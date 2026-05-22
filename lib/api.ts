const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface Package {
  id: number
  name: string
  destination: string
  duration_days: number
  price: number
  discount_price?: number
  max_people?: number
  image_url?: string
  cover_image_url?: string
  description?: string
  includes?: string
  excludes?: string
  itinerary?: string
  category: string
  is_special_offer: boolean
  is_featured: boolean
  is_active: boolean
}

export interface CategoryGroup {
  category: string
  label: string
  packages: Package[]
}

export interface Place {
  id: number
  name: string
  country: string
  city: string
  state_province?: string
  description?: string
  image_url?: string
  best_time_to_visit?: string
  is_featured: boolean
  is_active: boolean
  rating: number
}

export interface Review {
  id: number
  tour_id: number
  reviewer_name: string
  company_rating?: number
  company_comment?: string
  hotel_rating?: number
  hotel_comment?: string
  is_submitted: boolean
}

export interface TourRequest {
  title?: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  number_of_people: number
  start_date: string
  end_date: string
  customer_notes?: string
  turnstile_token?: string
}

export interface AuthUser {
  access_token: string
  token_type: string
  user_id: number
}

export interface UserProfile {
  id: number
  email: string
  first_name: string
  last_name: string
  phone: string
  address?: string
  country?: string
  is_verified: boolean
}

export interface TourDay {
  id: number
  day_number: number
  date: string
  place_name?: string
  stay_city?: string
  hotel_name?: string
  notes?: string
}

export interface MyTour {
  id: number
  title?: string
  customer_name: string
  customer_email: string
  number_of_people: number
  start_date: string
  end_date: string
  status: string
  total_price: number
  currency?: string
  payment_status: string
  customer_notes?: string
  days: TourDay[]
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || `API error ${res.status}`)
  }
  return res.json()
}

export const api = {
  packages: {
    list: (params?: { skip?: number; limit?: number; is_active?: boolean; category?: string }) => {
      const q = new URLSearchParams()
      if (params?.skip !== undefined) q.set("skip", String(params.skip))
      if (params?.limit !== undefined) q.set("limit", String(params.limit))
      if (params?.is_active !== undefined) q.set("is_active", String(params.is_active))
      if (params?.category) q.set("category", params.category)
      return apiFetch<Package[]>(`/api/packages/?${q}`)
    },
    get: (id: number) => apiFetch<Package>(`/api/packages/${id}`),
    specialOffers: (limit = 8) =>
      apiFetch<Package[]>(`/api/packages/special-offers?limit=${limit}`),
    byCategory: () =>
      apiFetch<CategoryGroup[]>(`/api/packages/categories`),
  },

  places: {
    list: (params?: { skip?: number; limit?: number; is_featured?: boolean }) => {
      const q = new URLSearchParams()
      if (params?.skip !== undefined) q.set("skip", String(params.skip))
      if (params?.limit !== undefined) q.set("limit", String(params.limit))
      if (params?.is_featured !== undefined) q.set("is_featured", String(params.is_featured))
      return apiFetch<Place[]>(`/api/places/?${q}`)
    },
    get: (id: number) => apiFetch<Place>(`/api/places/${id}`),
  },

  reviews: {
    list: () => apiFetch<Review[]>(`/api/reviews/`),
  },

  tours: {
    create: (data: TourRequest) =>
      apiFetch<{ id: number }>("/api/tours/", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  auth: {
    register: (data: { email: string; password: string; first_name: string; last_name?: string; phone?: string; turnstile_token?: string }) =>
      apiFetch<AuthUser & { message: string }>("/api/auth/user/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    login: (data: { email: string; password: string; turnstile_token?: string }) =>
      apiFetch<AuthUser>("/api/auth/user/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    requestOtp: (data: { email: string; turnstile_token?: string }) =>
      apiFetch<{ message: string }>("/api/auth/user/request-otp", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    verifyOtp: (data: { email: string; otp_code: string }) =>
      apiFetch<AuthUser>("/api/auth/user/verify-otp", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    getMe: (token: string) =>
      apiFetch<UserProfile>("/api/auth/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    updateMe: (token: string, data: Partial<Pick<UserProfile, "first_name" | "last_name" | "phone" | "address" | "country">>) =>
      apiFetch<UserProfile>("/api/auth/user/me", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }),
  },

  myTours: {
    list: (token: string) =>
      apiFetch<MyTour[]>("/api/tours/my-tours", {
        headers: { Authorization: `Bearer ${token}` },
      }),
  },
}
