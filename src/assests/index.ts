import mahabocwLogoUrl from "./mahabocw-logo.png";
import emblemUrl from "./maharashtra-government-emblem.png";
import sealUrl from "./maharashtra-state-seal.png";

export const MAHABOCW_LOGO_SRC = mahabocwLogoUrl;
export const MAHARASHTRA_EMBLEM_SRC = emblemUrl;
export const MAHARASHTRA_STATE_SEAL_SRC = sealUrl;

export const ASSET_METADATA = {
  logo: {
    src: mahabocwLogoUrl,
    fallback: "/mahabocw-logo.png",
    alt: "Maharashtra Building and Other Construction Workers Welfare Board (MBOCWWB) Logo",
  },
  seal: {
    src: sealUrl,
    fallback: "/maharashtra-state-seal.png",
    alt: "Maharashtra State Seal (प्रतिपच्चंद्रलेखेव)",
  },
  emblem: {
    src: emblemUrl,
    fallback: "/maharashtra-government-emblem.png",
    alt: "Government of India State Emblem (सत्यमेव जयते)",
  },
};
