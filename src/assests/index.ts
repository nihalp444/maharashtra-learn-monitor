import mahabocwLogoUrl from "./mahabocw-logo.png";
import emblemUrl from "./maharashtra-government-emblem.png";
import sealUrl from "./maharashtra-state-seal.png";
import devendraFadnavisUrl from "./DevendraFadnavis-stockimage-18-thumbnail.png";
import eknathShindeUrl from "./eknath-shinde.png";
import sunetraPawarUrl from "./Sunetra pawar.png";
import aakashFundkarUrl from "./Adv. Aakash Fundkar.jpeg";
import ashishJaiswalUrl from "./Adv. Ashish Jaiswal.png";
import rajeshAggarwalUrl from "./Shri. Rajesh Aggarwal.jpg";
import iaKundanUrl from "./smt-i-a-kundan.jpeg";
import vivekKumbharUrl from "./Shri. Vivek Shankar Kumbhar.png";

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
  officers: [
    {
      name: "Adv. Aakash Fundkar",
      title: "Hon. Minister (Labour) Hon. Pres. MBOCWWB",
      src: aakashFundkarUrl,
      fallback: "/Adv. Aakash Fundkar.jpeg",
      alt: "Adv. Aakash Fundkar - Hon. Minister (Labour) Hon. Pres. MBOCWWB",
    },
    {
      name: "Adv. Ashish Jaiswal",
      title: "Hon. Minister of State (Labour)",
      src: ashishJaiswalUrl,
      fallback: "/Adv. Ashish Jaiswal.png",
      alt: "Adv. Ashish Jaiswal - Hon. Minister of State (Labour)",
    },
    {
      name: "Shri. Rajesh Aggarwal",
      title: "Hon. Chief Secretary, State of Maharashtra",
      src: rajeshAggarwalUrl,
      fallback: "/Shri. Rajesh Aggarwal.jpg",
      alt: "Shri. Rajesh Aggarwal - Hon. Chief Secretary, State of Maharashtra",
    },
    {
      name: "Smt. I. A. Kundan (IAS)",
      title: "Hon. Principal Secretary (Labour)",
      src: iaKundanUrl,
      fallback: "/smt-i-a-kundan.jpeg",
      alt: "Smt. I. A. Kundan (IAS) - Hon. Principal Secretary (Labour)",
    },
    {
      name: "Shri. Vivek S. Kumbhar",
      title: "Secretary cum CEO, MBOCWWB",
      src: vivekKumbharUrl,
      fallback: "/Shri. Vivek Shankar Kumbhar.png",
      alt: "Shri. Vivek S. Kumbhar - Secretary cum CEO, MBOCWWB",
    },
  ],
  ministers: [
    {
      name: "Shri Devendra Fadnavis",
      title: "Hon'ble Chief Minister",
      src: devendraFadnavisUrl,
      fallback: "/devendra-fadnavis.png",
      alt: "Shri Devendra Fadnavis - Hon'ble Chief Minister",
    },
    {
      name: "Shri Eknath Shinde",
      title: "Hon'ble Deputy Chief Minister",
      src: eknathShindeUrl,
      fallback: "/eknath-shinde.png",
      alt: "Shri Eknath Shinde - Hon'ble Deputy Chief Minister",
    },
    {
      name: "Smt. Sunetra Pawar",
      title: "Hon'ble Deputy Chief Minister",
      src: sunetraPawarUrl,
      fallback: "/sunetra-pawar.png",
      alt: "Smt. Sunetra Pawar - Hon'ble Deputy Chief Minister",
    },
  ],
};
