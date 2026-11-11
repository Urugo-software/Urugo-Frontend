import {
  AgreementArticle,
  AgreementLanguage,
  SavedAgreementTemplate,
} from "@/types/agreement.types";

export interface StandardArticleDefinition {
  standardNumber: number;
  titleEn: string;
  titleRw: string;
  contentEn: string;
  contentRw: string;
  isMandatory: boolean;
}

export const CANONICAL_18_ARTICLES: StandardArticleDefinition[] = [
  {
    standardNumber: 1,
    titleEn: "Object of the Lease and Description of Premises",
    titleRw: "Intego y'Amasezerano n'Inyubako Ikodeshwa",
    contentEn:
      "The Landlord leases to the Renter the residential property located at {{PROPERTY_ADDRESS}}, designated as Unit {{UNIT_NUMBER}} within {{PROPERTY_NAME}}. The premises shall be utilized exclusively for private residential dwellings and for no other commercial or unauthorized purpose without the prior written consent of the Landlord.",
    contentRw:
      "Nyir'inzu akodesheje Umukode inzu yo guturamo iherereye {{PROPERTY_ADDRESS}}, Umuturirwa {{UNIT_NUMBER}} muri {{PROPERTY_NAME}}. Iyi nzu igomba gukoreshwa gusa ibikorwa byo guturamo mu buryo bwo bwite, ntihagire ibindi bikorwa by'ubucuruzi cyangwa ibitemewe biyikorerwamo hatabanje kubaho uruhushya rwanditse rwa Nyir'inzu.",
    isMandatory: true,
  },
  {
    standardNumber: 2,
    titleEn: "Duration and Term of Tenancy",
    titleRw: "Igihe Amasezerano Azamara",
    contentEn:
      "This tenancy commences on {{COMMENCEMENT_DATE}} for an initial agreed period of {{DURATION_MONTHS}} months. Upon expiration of the initial term, the agreement may be renewed upon mutual written agreement between both parties at least thirty (30) days prior to expiration. Otherwise, it shall convert to a month-to-month tenancy terminable by standard notice.",
    contentRw:
      "Aya masezerano atangira ku itariki ya {{COMMENCEMENT_DATE}} akazamara igihe cy'amezi {{DURATION_MONTHS}}. Iyo icyo gihe kirangiye, amasezerano ashobora kongerwa binyuze mu bwumvikane bwanditse hagati y'impande zombi nibura iminsi mirongo itatu (30) mbere y'uko arangira. Bitabaye ibyo, ahinduka amasezerano y'ukwezi ku kundi asozwa binyuze mu kubimenyesha bisanzwe.",
    isMandatory: true,
  },
  {
    standardNumber: 3,
    titleEn: "Monthly Rent and Payment Terms",
    titleRw: "Ubukode n'Uburyo bwo Kwishyura",
    contentEn:
      "The agreed monthly rent is fixed at {{MONTHLY_RENT}} RWF, payable in advance on or before the {{PAYMENT_DUE_DAY}}th day of each calendar month. Payments must be remitted via verifiable digital payment methods (such as MTN Mobile Money, Airtel Money, or direct bank transfer) into the designated Landlord account. A late payment fee of 2% may be assessed if rent remains unpaid after five (5) days beyond the due date.",
    contentRw:
      "Ubukode bwumvikanyweho bungana na {{MONTHLY_RENT}} RWF ku kwezi, bukishyurwa mbere y'itariki ya {{PAYMENT_DUE_DAY}} ya buri kwezi. Ubwishyu bukorwa hifashishijwe uburyo bw'ikoranabuhanga bugaragara (nk'urugero MTN Mobile Money, Airtel Money, cyangwa konti ya banki) kuri konti yagenwe na Nyir'inzu. Iyo ubukode burengeje iminsi itanu (5) bishobora gutuma hishyuzwa inyungu y'ubukererwe ya 2%.",
    isMandatory: true,
  },
  {
    standardNumber: 4,
    titleEn: "Security Deposit",
    titleRw: "Ingwate y'Ubukode",
    contentEn:
      "Prior to occupancy, the Renter deposits with the Landlord a refundable security deposit of {{SECURITY_DEPOSIT}} RWF, representing one month's rent. The security deposit shall be held as security for the faithful performance of the Renter's covenants and shall not be used by the Renter as rent. It shall be reimbursed within fourteen (14) days following vacant possession, less any lawful deductions for repairs or outstanding utility arrears.",
    contentRw:
      "Mbere yo gutangira gutura, Umukode ashyikiriza Nyir'inzu ingwate y'ubukode ingana na {{SECURITY_DEPOSIT}} RWF, ingana n'ubukode bw'ukwezi kumwe. Iyi ngwate izabikwa nk'ikimenyetso cyo kubahiriza amasezerano kandi ntiyemerewe gukoreshwa nk'ubukode n'Umukode. Izishyurwa Umukode mu minsi cumi n'ine (14) nyuma yo kuva mu nzu, havuyemo amafaranga y'isana cyangwa ibirarane by'amazi n'umuriro.",
    isMandatory: true,
  },
  {
    standardNumber: 5,
    titleEn: "Utilities and Public Services",
    titleRw: "Amazi, Amashanyarazi n'Izindi Serivisi",
    contentEn:
      "The Renter is solely responsible for payment of all utilities consumed during the tenancy, including metered water (WASAC), prepaid electricity (EUCL / Cashpower), garbage collection, sanitation fees, and private telecommunications or internet services. The Renter shall furnish receipt copies of cleared utility dues upon vacating the premises.",
    contentRw:
      "Umukode ni we ufite inshingano zo kwishyura amazi yakoresheje (WASAC), amashanyarazi (EUCL / Cashpower), amafaranga y'isuku no gutwara imyanda, ndetse n'itumanaho cyangwa interineti. Umukode asabwa kwerekana inyemezabwishyu zerekana ko nta mazi cyangwa umuriro arimo igihe avuye mu nzu.",
    isMandatory: true,
  },
  {
    standardNumber: 6,
    titleEn: "Use and Care of Premises",
    titleRw: "Imikoreshereze n'Ubwitwararike ku Nzu",
    contentEn:
      "The Renter shall maintain the premises in a clean, hygienic, and tenantable condition. The Renter shall not store hazardous, flammable, or illicit materials on the premises, nor conduct any activity in contravention of laws and local administrative regulations in Rwanda.",
    contentRw:
      "Umukode agomba gufata inzu neza, ku buryo busukuye kandi bubungabunzwe. Ntiyemerewe kubikamo ibintu biteje akaga, bishobora gucana umuriro, cyangwa bitemewe n'amategeko, cyangwa gukora ibikorwa binyuranye n'amategeko n'amabwiriza y'ubuyobozi mu Rwanda.",
    isMandatory: false,
  },
  {
    standardNumber: 7,
    titleEn: "Condition of Premises and Entry Inventory",
    titleRw: "Imiterere y'Inzu n'Ibarura ry'Ibikoresho",
    contentEn:
      "Both parties shall conduct a joint inspection upon move-in and endorse an entry inventory report detailing the physical condition of the premises, walls, locks, windows, plumbing fixtures, and electrical installations. The premises are acknowledged to be received in good order unless otherwise stipulated in the entry report.",
    contentRw:
      "Impande zombi zizakorana igenzura igihe Umukode akinjira mu nzu, zishyire umukono ku nyandiko y'ibarura ry'ibikoresho igaragaza imiterere y'inkuta, ingufuri, amadirishya, imiyoboro y'amazi n'amashanyarazi. Inzu ifatwa nk'iyashyikirijwe imeze neza uretse ibyanditswe mu nyandiko y'igenzura.",
    isMandatory: false,
  },
  {
    standardNumber: 8,
    titleEn: "Maintenance and Repairs",
    titleRw: "Gusana no Kubungabunga Inzu",
    contentEn:
      "The Landlord shall be responsible for structural repairs, main roof leakages, external walls, and plumbing infrastructure resulting from normal wear and tear. The Renter shall be responsible for routine tenant repairs, including bulb replacements, unclogging interior sink drainage, repairing damaged taps, and fixing any damage caused by negligence or misuse by the Renter or their visitors.",
    contentRw:
      "Nyir'inzu ashinzwe gusana ibyangiritse ku miterere y'inzu (nk'igisenge, inkuta z'inyuma, n'imiyoboro migari y'amazi) biturutse ku kigero cyo gusaza bisanzwe. Umukode ashinzwe imirimo yo gusana ibikoresho byoroheje imbere mu nzu (amatara, amavoka, imyenge y'amazi ifunze) n'ibindi byangijwe n'uburangare bwe cyangwa abashyitsi be.",
    isMandatory: true,
  },
  {
    standardNumber: 9,
    titleEn: "Alterations and Improvements",
    titleRw: "Guhindura no Kongera Ibintu ku Nzu",
    contentEn:
      "The Renter shall not execute structural modifications, repaint internal or external walls, drill major holes, or alter fixtures without prior written consent of the Landlord. Any authorized improvement made by the Renter shall, at the Landlord's discretion, remain the property of the Landlord without compensation upon departure.",
    contentRw:
      "Umukode ntiyemerewe guhindura imiterere y'inzu, gusiga irangi rishya, gutobora inkuta ku buryo bukabije, cyangwa guhindura ibikoresho bitabanje kwemezwa mu nyandiko na Nyir'inzu. Ibyahinduwe byose byemejwe bizasigara ari umutungo wa Nyir'inzu hatabayeho kwishyurwa indishyi.",
    isMandatory: false,
  },
  {
    standardNumber: 10,
    titleEn: "Landlord Right of Inspection and Entry",
    titleRw: "Uburenganzira bwo Gusura no Kugenzura Inzu",
    contentEn:
      "The Landlord or their designated agent reserves the right to enter the premises to inspect structural conditions or carry out necessary repairs. Except in sudden emergencies threatening life or property, the Landlord shall provide at least twenty-four (24) hours advance notice before scheduling an entry visit during reasonable daytime hours.",
    contentRw:
      "Nyir'inzu cyangwa umuhagarariye afite uburenganzira bwo gusura inzu kugira ngo asuzume uko imeze cyangwa akore imirimo yo gusana. Uretse mu bihe by'ubutabazi bwihutirwa, Nyir'inzu agomba kubimenyesha Umukode nibura amasaha makumyabiri n'ane (24) mbere yo gusura mu masaha y'amanywa akwiye.",
    isMandatory: false,
  },
  {
    standardNumber: 11,
    titleEn: "Subletting and Assignment Prohibited",
    titleRw: "Gukodesha Undi Muntu (Subletting) Birabujijwe",
    contentEn:
      "The Renter shall not sublet, assign, mortgage, or transfer the tenancy or any portion of the premises to any third party, whether for remuneration or free of charge, without the formal prior written authorization of the Landlord.",
    contentRw:
      "Umukode ntiyemerewe gukodesha undi muntu, guhererekanya, cyangwa gutiza inzu cyangwa igice cyayo ku wundi muntu uwo ari we wese, yaba ku kiguzi cyangwa ku buntu, hatabanje kubaho uruhushya rwanditse rwa Nyir'inzu.",
    isMandatory: true,
  },
  {
    standardNumber: 12,
    titleEn: "Quiet Enjoyment and Good Neighborliness",
    titleRw: "Umutuzo n'Imibanire Myiza n'Abaturanyi",
    contentEn:
      "The Landlord warrants that the Renter shall peaceably hold and enjoy the premises without interruption during the term. Reciprocally, the Renter agrees to respect noise regulations, uphold moral decorum, and refrain from causing disturbance, nuisance, or harassment to adjacent residents.",
    contentRw:
      "Nyir'inzu yemeje ko Umukode azatura mu mudendezo n'umutuzo mu gihe amasezerano akora. Ku ruhande rw'Umukode, yiyemeje kubahiriza amategeko yo kutagira urusaku rukabije, kubana neza n'abaturanyi, no kwirinda imyitwarire ihungabanya umutekano n'isuku y'abaturanyi.",
    isMandatory: false,
  },
  {
    standardNumber: 13,
    titleEn: "Insurance and Liability",
    titleRw: "Ubwishingizi n'Inshingano",
    contentEn:
      "The Landlord maintains building insurance for the physical structure. The Landlord carries no liability for theft, loss, or accidental damage to the Renter's personal movable belongings, furniture, or electronic appliances. The Renter is advised to maintain independent home contents insurance coverage.",
    contentRw:
      "Nyir'inzu afata ubwishingizi bw'inzu ubwayo. Nyir'inzu ntaryozwa ubujura, ibihombo, cyangwa ibyangiritse ku mitungo bwite y'Umukode, ibikoresho byo mu nzu, cyangwa ibyuma by'ikoranabuhanga. Umukode agirwa inama yo gufata ubwishingizi bw'ibikoresho bye bwite.",
    isMandatory: false,
  },
  {
    standardNumber: 14,
    titleEn: "Default and Breach of Agreement",
    titleRw: "Kutubahiriza Amasezerano",
    contentEn:
      "In the event the Renter defaults on rent payment exceeding fifteen (15) days, or commits a material breach of any covenant herein, the Landlord shall issue a formal written notice of default granting ten (10) days to cure the defect. Failure to cure entitles the Landlord to terminate the lease immediately and seek lawful eviction and full recovery of arrears.",
    contentRw:
      "Iyo Umukode atishyuye ubukode mu gihe kirenze iminsi cumi n'itanu (15), cyangwa akinangira gukurikiza amasezerano, Nyir'inzu amuha integuza yanditse y'iminsi icumi (10) yo gukosora iryo kosa. Iyo bitakozwe, Nyir'inzu afite uburenganzira bwo gusesa amasezerano no gukurikirana ibirarane byose mu mategeko.",
    isMandatory: true,
  },
  {
    standardNumber: 15,
    titleEn: "Termination and Notice Period",
    titleRw: "Gusesa Amasezerano n'Igihe cyo Kubimenyesha",
    contentEn:
      "Either party may terminate this agreement at the conclusion of the initial lease period by serving a written notice of at least thirty (30) calendar days to the other party. Early termination without cause requires thirty (30) days notice and payment of one month's rent as contractual compensation.",
    contentRw:
      "Buri ruhande rushobora gusesa aya masezerano ku mpera z'igihe cyumvikanyweho binyuze mu kumenyesha urundi ruhande mu nyandiko nibura iminsi mirongo itatu (30) mbere. Gusesa amasezerano mbere y'igihe nta mpamvu ifatika bisaba kumenyesha mbere y'iminsi 30 no kwishyura indishyi ingana n'ubukode bw'ukwezi kumwe.",
    isMandatory: true,
  },
  {
    standardNumber: 16,
    titleEn: "Handover of Premises upon Vacation",
    titleRw: "Gusubiza Inzu Nyuma yo Gusesa Amasezerano",
    contentEn:
      "Upon vacating, the Renter shall restore the premises to the original state noted at entry, clean all interiors, return all sets of keys and access devices, and settle all utility tallies. A final joint exit inspection shall be completed within forty-eight (48) hours of move-out.",
    contentRw:
      "Igihe avuye mu nzu, Umukode asabwa gusubiza inzu mu miterere yari iriho atangira gutura, kuyisukura, gutanga imfunguzo zose, no kwishyura fagitire zose z'amazi n'umuriro zikiriho. Igenzura ryo gusohoka mu nzu rizakorwa n'impande zombi mu masaha 48 Umukode asohotse.",
    isMandatory: true,
  },
  {
    standardNumber: 17,
    titleEn: "Dispute Resolution and Governing Law",
    titleRw: "Gukemura Amakimbirane n'Amategeko Akurikizwa",
    contentEn:
      "This agreement is governed by the laws of the Republic of Rwanda, notably Law No. 59/2011 on Land and housing rental. Any disputes arising between the parties shall first be addressed amicably through mediation. Where mediation fails, disputes shall be submitted to the competent courts of Kigali, Rwanda.",
    contentRw:
      "Aya masezerano agengwa n'amategeko ya Repubulika y'u Rwanda, by'umwihariko Itegeko No 59/2011 rigenga ubutaka n'ubukode bw'amazu. Amakimbirane yose avutse azabanza gukemurwa mu bwumvikane no mu bunzi. Iyo bitunze, amakimbirane ashyikirizwa inkiko zibifitiye ububasha i Kigali mu Rwanda.",
    isMandatory: true,
  },
  {
    standardNumber: 18,
    titleEn: "Entire Agreement and Electronic Execution",
    titleRw: "Amasezerano Yose Hamwe n'Iyemeza ry'Ikoranabuhanga",
    contentEn:
      "This document constitutes the entire agreement between the parties and supersedes any prior oral or written representations. No modification shall be binding unless made in writing and signed by both parties. Electronic signatures and verified confirmations executed through the Urugo platform possess the same legal force and validity as handwritten ink signatures under Rwandan law.",
    contentRw:
      "Iyi nyandiko ikubiyemo amasezerano yose yuzuye hagati y'impande zombi kandi isimbye ibindi byavuzwe mbere. Nta cyahindurwa kitakozwe mu nyandiko ngo kishyirweho umukono n'impande zombi. Imikono y'ikoranabuhanga n'ibyemezo binyuze ku rubuga rwa Urugo bifite agaciro n'imbaraga mu mategeko nk'imikono yakoreshejwe ikaramu munsi y'amategeko y'u Rwanda.",
    isMandatory: true,
  },
];

export function generateStandardArticles(language: AgreementLanguage): AgreementArticle[] {
  return CANONICAL_18_ARTICLES.map((item, index) => ({
    id: `art-${index + 1}`,
    number: index + 1,
    standardNumber: item.standardNumber,
    title: language === "rw" ? item.titleRw : item.titleEn,
    content: language === "rw" ? item.contentRw : item.contentEn,
    isStandard: true,
    isCustom: false,
  }));
}

export function interpolateArticleText(
  text: string,
  variables: Record<string, string | number | undefined>
): string {
  let result = text;
  for (const [key, val] of Object.entries(variables)) {
    const placeholder = new RegExp(`{{${key}}}`, "g");
    result = result.replace(placeholder, String(val ?? ""));
  }
  return result;
}

export const SAVED_AGREEMENT_TEMPLATES: SavedAgreementTemplate[] = [
  {
    id: "tpl-en-standard",
    name: "Standard Residential Tenancy (English)",
    description: "Official 18 statutory clauses compliant with Law No. 27/2021 on land and rental governance.",
    language: "en",
    lastModified: "2026-10-15",
    articles: generateStandardArticles("en"),
  },
  {
    id: "tpl-en-furnished",
    name: "Furnished Apartment Tenancy (English)",
    description: "Standard statutory covenants plus specialized clause for furniture inventory and maintenance.",
    language: "en",
    lastModified: "2026-11-01",
    articles: [
      ...generateStandardArticles("en"),
      {
        id: "art-custom-furnished-en",
        number: 19,
        title: "Furnishings and Inventory Schedule",
        content: "The premises are let inclusive of the appliances, fixtures, and furniture detailed in the initial move-in inventory schedule. The Renter agrees to maintain all provided furnishings in good repair, subject to fair wear and tear.",
        isStandard: false,
        isCustom: true,
      },
    ],
  },
  {
    id: "tpl-rw-standard",
    name: "Inyandiko Rusange yo Gukodesha Inzu (Kinyarwanda)",
    description: "Ingingo 18 z'ibanze zikurikije amategeko n'amabwiriza agenga ubutaka n'ubukode mu Rwanda.",
    language: "rw",
    lastModified: "2026-10-15",
    articles: generateStandardArticles("rw"),
  },
  {
    id: "tpl-rw-furnished",
    name: "Inyandiko y'Inzu Ifite Ibikoresho (Kinyarwanda)",
    description: "Amasezerano akubiyemo ingingo 18 z'ibanze hiyongereyeho amabwiriza yo kubungabunga ibikoresho byo mu nzu.",
    language: "rw",
    lastModified: "2026-11-01",
    articles: [
      ...generateStandardArticles("rw"),
      {
        id: "art-custom-furnished-rw",
        number: 19,
        title: "Ibikoresho n'Umutungo Uri mu Nzu",
        content: "Inzu ikodeshejwe irimo ibikoresho, ibyuma n'intebe byanditswe ku mugereka w'ibikoresho basinyanye igihe Umukode yinjiraga. Umukode yemeye kubungabunga ibyo bikoresho mu buryo bukwiye no kutabyangiza nkana.",
        isStandard: false,
        isCustom: true,
      },
    ],
  },
];

