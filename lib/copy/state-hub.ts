/**
 * state-hub.ts
 *
 * Copy for the three state hubs. Minimum 700 words each, per CLAUDE.md
 * section 11: the state's housing stock by region named, state-specific
 * programs, codes and permitting realities, and the regional weather exposure
 * that drives demand.
 *
 * Programs, codes, and authorities are named exactly as published and only
 * where accurate. See CLAUDE.md section 8. No rebate amount, permit fee, or
 * code section number appears anywhere in this file.
 */

import type { StateCode } from "../data/cities";
import type { Faq } from "../schema";

export interface StateHubCopy {
  lede: string;
  metaDetail: string;
  sections: Array<{ heading: string; body: string[] }>;
  faqs: Faq[];
}

export const STATE_HUB: Record<StateCode, StateHubCopy> = {
  RI: {
    lede: "Thirty-nine municipalities, and the housing changes completely across about forty miles. Triple-deckers in the Providence and Blackstone Valley mill cities, postwar capes and ranches through Warwick and Cranston, colonial-era stock in Newport and Wickford, and shingled cottages down the South County shore.",
    metaDetail:
      "Triple-deckers in the mill cities, postwar capes in Kent County, colonial stock in Newport",
    sections: [
      {
        heading: "The state's housing, region by region",
        body: [
          "Providence Metro and the Blackstone Valley hold the densest and oldest urban stock in the state. Triple-deckers built between roughly 1880 and 1925 dominate Providence's Elmwood, West End, Olneyville, and Smith Hill, and run continuously through Pawtucket, Central Falls, and Woonsocket. The defining feature of that housing, and the one almost nobody writes about, is the low-slope rear ell. It leaks long before the main roof does, it needs EPDM rather than shingle, and it is where most urban roof work in this state actually happens.",
          "Providence's East Side is a different state of affairs entirely: Victorians, Colonial Revivals, and Federal brick around Benefit Street, much of it inside historic district review, where window profile and roofing material need approval before anything is ordered.",
          "Kent County, meaning Warwick, West Warwick, Coventry, and East Greenwich, is Rhode Island's deepest concentration of postwar capes and ranches, built out fast between 1945 and 1965. Standard opening sizes, plywood sheathing, and simple roof geometry make this the most predictable and least expensive housing to work on in the state. Much of it still carries original aluminium sliders and undersized five inch gutter on roof planes that need six.",
          "Newport County and the East Bay carry genuinely early housing. Colonial and Federal stock in Newport and Bristol, Victorian summer cottages in Newport, and shingled coastal housing throughout. This is the most expensive market in the state to work in, driven by historic review, high-value stock, and salt exposure.",
          "South County, from Narragansett through Westerly and Charlestown to Little Compton, is coastal cottage territory: cedar shingle, exposed elevations, and fastener corrosion as the primary failure mode. Block Island sits apart, because every board and every crew crosses on a ferry, and that surcharge is the largest single geographic cost factor anywhere in these three states.",
          "Northern Rhode Island, meaning Smithfield, Glocester, Burrillville, and Foster, runs to farmhouses, center chimney colonials, and scattered mill village housing, on larger lots and at the lowest labour rates in the state.",
        ],
      },
      {
        heading: "Codes, permits, and programs",
        body: [
          "Building permits are issued by each municipality's building department, and work is inspected against the Rhode Island State Building Code, SBC-1, administered by the Rhode Island Building Code Commission. There are eight cities and thirty-one towns, and the process is broadly consistent across them.",
          "Work close to the shoreline may additionally fall under the Coastal Resources Management Council, which has jurisdiction over coastal construction in the state. That applies to a narrower set of projects than homeowners expect, but it is worth confirming before scheduling work on an exposed lot.",
          "Where a house sits in a local historic district, review runs separately from the building permit and on its own timetable. The Rhode Island Historical Preservation and Heritage Commission is the statewide body, though the review that affects a specific project is the local commission. Four to eight weeks is a realistic allowance before ordering.",
          "Rhode Island Energy runs home energy assessments and incentives that can apply to insulation, air sealing, and in some cases window work. Terms change, sometimes mid-year, so confirm what is current rather than relying on a figure published anywhere, including here.",
        ],
      },
      {
        heading: "What the weather actually does",
        body: [
          "Two mechanisms drive most of the exterior work in this state, and both are worth understanding rather than treating as generic bad weather.",
          "Ice dams form when heat escaping into an under-insulated attic melts the snowpack, the meltwater runs down to the cold overhang past the heated part of the house, and it refreezes there. The resulting dam holds water against shingles designed to shed water running down, not to hold water sitting still. It presents as a roof problem and it is an insulation and ventilation problem. A new roof over an unchanged attic gets you the same ice dams the following winter.",
          "Salt air attacks fasteners before it attacks anything visible. Electro-galvanised nails corrode in coastal exposure and the shingle or the shingle course stays put until the nail head fails, usually during a nor'easter rather than gradually. Along the entire South County and Newport County shoreline, stainless or hot-dipped galvanised fasteners are the specification rather than an upgrade, and the difference across a whole project is small.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many municipalities are in Rhode Island?",
        answer:
          "Thirty-nine: eight cities and thirty-one towns. Each has its own building department issuing permits under the Rhode Island State Building Code.",
      },
      {
        question: "Why is coastal work more expensive here?",
        answer:
          "Upgraded fasteners and materials, shorter paint life, and in some cases Coastal Resources Management Council review. Block Island is a separate case again, because every material and every crew arrives by ferry.",
      },
      {
        question: "What is a triple-decker and why does it matter?",
        answer:
          "A three-story wooden multi-family, one unit per floor, built in large numbers in the mill cities between about 1880 and 1925. It matters because a window job means 40 to 60 openings across three floors, and because the low-slope rear ell is where the roof actually leaks.",
      },
    ],
  },

  MA: {
    lede: "Three hundred and fifty-one cities and towns, and a range of housing wider than anywhere else in the region. First period and Georgian stock in Essex County, three-deckers through Worcester and the Merrimack Valley, garrison colonials across MetroWest, and shingle-style houses on the Cape and the Islands.",
    metaDetail:
      "Three-deckers in Worcester and Lowell, first period stock in Essex County, Stretch Code adoption",
    sections: [
      {
        heading: "The state's housing, region by region",
        body: [
          "Worcester and Central Massachusetts hold roughly fifteen thousand three-deckers, the largest concentration in New England. A window job on one means 40 to 60 openings across three floors of weight-and-pulley sash, which is a completely different project from a suburban window job and prices on a completely different basis.",
          "The Merrimack Valley, meaning Lowell, Lawrence, and Haverhill, carries the same mill-city pattern: dense three-family and worker housing from 1880 to 1925, narrow lots, and staging constraints that are a real cost factor rather than a detail.",
          "Greater Boston and the inner suburbs run to Victorians, triple-deckers in Somerville and Dorchester, and brownstones and bowfronts in the Back Bay and South End. It is the highest-cost market in the state and permitting overhead is heavier than elsewhere.",
          "MetroWest and the North Shore suburbs are garrison colonials and split levels, mostly postwar, interspersed with genuinely antique housing. Essex County, Concord, Lexington, and Ipswich hold first period and Georgian stock, some of it seventeenth century, much of it under local historic district review.",
          "The South Coast, meaning New Bedford and Fall River, is mill-city housing again, with heavy three-decker stock and some of the lowest labour rates in the eastern half of the state.",
          "Cape Cod, the South Shore, and the Islands carry shingle-style and salt-exposed coastal housing, plus original and reproduction Cape Cod houses everywhere. Nantucket and the Martha's Vineyard towns are ferry-dependent, which adds a material transport surcharge to everything, and Nantucket in particular is under some of the strictest design review in the country.",
          "The Pioneer Valley and the Berkshires run to farmhouses, center chimney colonials, Greek Revival, and Victorians in Springfield's McKnight district, at the lowest labour rates in the state.",
        ],
      },
      {
        heading: "Codes, permits, and programs",
        body: [
          "Permits are issued by each municipality's building department and work is inspected against the Massachusetts State Building Code, 780 CMR, administered by the Board of Building Regulations and Standards.",
          "The Stretch Energy Code applies in municipalities that have adopted it, and adoption is not uniform across the state. It affects insulation and air sealing requirements on some projects, so whether it applies to your town is worth establishing before design rather than during inspection.",
          "Local historic district commissions govern exterior work in many communities, and the Massachusetts Historical Commission is the statewide body. In districts such as Old King's Highway on the Cape, review is a formal and consistently applied process rather than an occasional one.",
          "Mass Save runs a no-cost home energy assessment and offers coverage toward insulation and air sealing for qualifying homes. Coverage levels and terms change. Confirm current ones directly rather than relying on any published figure.",
        ],
      },
      {
        heading: "What the weather actually does",
        body: [
          "Ice dams are the dominant winter failure mode inland and are worth understanding as a mechanism. Heat escaping into an under-insulated attic melts the snowpack, the meltwater refreezes at the cold overhang, and the dam pushes water back up under shingles that are designed to shed running water rather than hold standing water. It is an attic problem presenting as a roof problem, and it is fixed with air sealing, insulation, and balanced soffit-to-ridge ventilation.",
          "On the Cape, the Islands, the South Shore, and the North Shore, salt exposure drives a different set of decisions. Fastener corrosion comes first, then paint life. Fiber cement holds paint 12 to 15 years in coastal exposure where vinyl fades and cannot be repainted to fix it, and cedar shingle weathers rather than failing, which is why it remains the regional answer on exposed elevations.",
          "Snow load matters in the Berkshires and the hill towns in a way it does not on the coast, and it is the reason roof pitch and framing capacity come up in those markets and rarely elsewhere.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many cities and towns are in Massachusetts?",
        answer:
          "Three hundred and fifty-one. Each issues its own building permits under the Massachusetts State Building Code, 780 CMR.",
      },
      {
        question: "Does the Stretch Energy Code apply to my project?",
        answer:
          "It depends on whether your municipality has adopted it, and adoption is not uniform across the state. It can affect insulation and air sealing requirements. Establish whether it applies before design rather than at inspection.",
      },
      {
        question: "What makes island work more expensive?",
        answer:
          "Materials and crews cross by ferry, which adds a transport surcharge and ties scheduling to boat capacity rather than to the contractor's calendar. On Nantucket, design review adds a separate and substantial timeline.",
      },
    ],
  },

  CT: {
    lede: "One hundred and sixty-nine municipalities, and an unusual amount of genuinely eighteenth century housing still in daily use. Center chimney colonials and saltboxes statewide, stone and Tudor revival in Fairfield County, mill worker housing through the Quiet Corner, and shoreline housing along Long Island Sound.",
    metaDetail:
      "Center chimney colonials and saltboxes statewide, Fairfield County stone, Sound exposure",
    sections: [
      {
        heading: "The state's housing, region by region",
        body: [
          "Center chimney colonials and saltboxes run throughout Connecticut, and a genuine share of them are eighteenth century rather than reproduction. That matters practically: hand-hewn framing, irregular rafter spacing, board sheathing, and nothing square. Work on that housing is carpentry first and the nominal trade second, and it should be priced with a written allowance rather than a fixed number.",
          "Fairfield County is the highest-cost market in all three states by a wide margin. Substantial stone, Tudor revival, and shingle-style houses on large lots, frequently with slate or synthetic slate roofs and copper flashing where replacement is specialty work. Mixing aluminium into an existing copper system causes galvanic corrosion, which is a detail that matters here more than anywhere else in the region.",
          "Greater Hartford and New Haven County hold Victorians, three-family housing, and dense nineteenth century urban stock. Hartford is the state capital and has no organic incumbent covering it well, which is unusual for a market that size.",
          "The Naugatuck Valley and the eastern part of the state run to postwar capes and ranches at some of the lowest labour rates in Connecticut. The Quiet Corner, meaning Windham, Tolland, and the northeast towns, carries mill worker housing in Willimantic, Putnam, and Danielson, plus farmhouses and Greek Revival on larger lots.",
          "The Connecticut Shoreline, through New Haven, Middlesex, and New London counties, carries salt exposure, flood zone requirements on some lots, and a mix of coastal cottage and year-round housing. Litchfield County and the Northwest Hills hold farmhouses and Greek Revival on steep terrain with heavy tree canopy, where access and snow load both come into play.",
        ],
      },
      {
        heading: "Codes, permits, and programs",
        body: [
          "Permits are issued by each municipality's building official and work is inspected against the Connecticut State Building Code, administered by the Office of the State Building Inspector.",
          "Local historic district commissions govern exterior work in many towns, and Old Wethersfield and the Litchfield green district are among the more rigorously reviewed. The State Historic Preservation Office is the statewide body, though the review affecting a specific project is local.",
          "Energize CT runs the Home Energy Solutions assessment, which covers air sealing and basic weatherization at the visit. The Connecticut Green Bank offers financing for energy improvements, including options that attach repayment to the property rather than to the borrower. Program terms change, so confirm current ones before counting on them.",
        ],
      },
      {
        heading: "What the weather actually does",
        body: [
          "Inland and in the hill towns, ice dams are the dominant winter problem, and the mechanism is the same everywhere: heat escaping into an under-insulated attic melts the snowpack, the meltwater refreezes at the cold overhang, and the dam pushes water back under the shingles. It is an insulation and ventilation problem regardless of how it presents.",
          "Along Long Island Sound, salt exposure drives fastener and coating decisions. Stainless or hot-dipped galvanised fasteners within about a mile of open water, and materials that do not depend on a coating to survive. Some shoreline lots also carry flood zone requirements that affect how the bottom of the structure is detailed.",
          "In Litchfield County and the Northwest Hills, heavy tree canopy means persistent leaf load in gutters and more shade, which keeps roof surfaces damp longer and shortens the life of anything organic. Steep drives and rural access add staging cost that offsets the lower labour rates in those towns.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many municipalities are in Connecticut?",
        answer:
          "One hundred and sixty-nine. Each has its own building official issuing permits under the Connecticut State Building Code.",
      },
      {
        question: "Why is Fairfield County so much more expensive?",
        answer:
          "Higher labour rates, larger and more substantial housing, more slate and copper work, and more design review. It runs well above every other market in these three states.",
      },
      {
        question: "What is a saltbox and does it change the work?",
        answer:
          "A colonial form with a long rear roof plane sweeping down to a lower eave at the back. It changes roofing in particular, because that long plane is a single continuous run at a steep pitch, and the framing underneath is frequently original and irregular.",
      },
    ],
  },
};

export function stateHubWordCount(state: StateCode): number {
  const copy = STATE_HUB[state];
  const text = [
    copy.lede,
    ...copy.sections.flatMap((s) => [s.heading, ...s.body]),
    ...copy.faqs.flatMap((f) => [f.question, f.answer]),
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}
