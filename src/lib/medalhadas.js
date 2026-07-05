const KEY = "medalhadas";

export function hasBadge(name) {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(list) && list.includes(name);
  } catch {
    return false;
  }
}

export function awardBadge(name) {
  const list = JSON.parse(localStorage.getItem(KEY) || "[]");
  if (!list.includes(name)) {
    list.push(name);
    localStorage.setItem(KEY, JSON.stringify(list));
  }
}
