const DB_MODE_KEY = "erp_db_mode";

export const DB_MODES = {
  PROD: "prod",
  LOCAL: "local",
};

const normalizeMode = (mode) =>
  String(mode || "")
    .trim()
    .toLowerCase() === DB_MODES.LOCAL
    ? DB_MODES.LOCAL
    : DB_MODES.PROD;

export const getDbMode = () => {
  try {
    const stored = localStorage.getItem(DB_MODE_KEY);
    return normalizeMode(stored || DB_MODES.PROD);
  } catch {
    return DB_MODES.PROD;
  }
};

export const isLocalDbMode = () => getDbMode() === DB_MODES.LOCAL;

export const setDbMode = (mode) => {
  const normalized = normalizeMode(mode);
  localStorage.setItem(DB_MODE_KEY, normalized);
  window.dispatchEvent(
    new CustomEvent("erp:db-mode-changed", { detail: { mode: normalized } }),
  );
  return normalized;
};
