// src/util/yelp.js

const SEARCH_PATH = "/api/yelp/businesses/search";

async function searchBusinesses(term, location, sortBy) {
  const params = new URLSearchParams({
    term,
    location,
    sort_by: sortBy,
    limit: "20",
  });

  const res = await fetch(`${SEARCH_PATH}?${params}`);

  if (!res.ok) {
    throw new Error(`Yelp request failed (${res.status})`);
  }

  const data = await res.json();

  return data.businesses.map((business) => ({
    id: business.id,
    imageSrc: business.image_url,
    name: business.name,
    address: business.location.address1,
    city: business.location.city,
    state: business.location.state,
    zipCode: business.location.zip_code,
    category: business.categories[0]?.title || "",
    rating: business.rating,
    reviewCount: business.review_count,
  }));
}

export default searchBusinesses;