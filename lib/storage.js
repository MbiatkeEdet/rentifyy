const STORAGE_KEY = 'properties';

export const getProperties = () => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveProperty = (property) => {
  const properties = getProperties();
  const newProperty = {
    ...property,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  properties.push(newProperty);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  return newProperty;
};

export const deleteProperty = (id) => {
  const properties = getProperties();
  const filtered = properties.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const updateProperty = (id, updates) => {
  const properties = getProperties();
  const index = properties.findIndex(p => p.id === id);
  if (index !== -1) {
    properties[index] = { ...properties[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  }
};

export const getPropertyTypes = () => [
  'Self Contain',
  '1 Bedroom Flat',
  '2 Bedroom Flat',
  '3 Bedroom Flat',
  '4+ Bedroom Flat',
  'Studio Apartment',
  'Duplex',
];