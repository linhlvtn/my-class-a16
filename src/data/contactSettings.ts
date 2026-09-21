export type ContactSettings = { phone: string; zaloUrl: string }

const KEY = 'class_hub_2a16_contact_settings'
const FALLBACK: ContactSettings = { phone: '0982296281', zaloUrl: 'https://zalo.me/0982296281' }

export function getContactSettings(): ContactSettings {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved) return { ...FALLBACK, ...JSON.parse(saved) }
  } catch (_) {}
  return { ...FALLBACK }
}

export function saveContactSettings(value: ContactSettings) {
  localStorage.setItem(KEY, JSON.stringify(value))
  window.dispatchEvent(new Event('class-contact-updated'))
}
