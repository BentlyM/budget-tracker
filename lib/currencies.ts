export const Currencies = [
  { value: 'USD', label: '$ Dollar', locale: 'en-US' },
  { value: 'EUR', label: '€ Euro', locale: 'fr-FR' },
  { value: 'GBP', label: '£ Pound', locale: 'en-GB' },
  { value: 'JPY', label: '¥ Yen', locale: 'ja-JP' },
  { value: 'INR', label: '₹ Indian Rupee', locale: 'en-IN' },
  { value: 'RUB', label: '₽ Russian Ruble', locale: 'ru-RU' },
];

export type Currency = (typeof Currencies)[0];
