export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    id: 1,
    question: "What documents are required to rent a car?",
    answer:
      "To sign the rental agreement, you need a valid driving license (held for at least 12 months), an ID card or passport, and a payment card in the main driver's name.",
  },
  {
    id: 2,
    question: "Is there a refundable security deposit?",
    answer:
      "Yes, a refundable security deposit is temporarily authorized on your payment card upon vehicle pickup. The amount depends on the vehicle class. The funds are automatically released once the undamaged car is returned.",
  },
  {
    id: 3,
    question: "Are there any mileage limits?",
    answer:
      "All our standard short-term rentals come with unlimited mileage within Poland. For trips abroad, individual terms and conditions apply.",
  },
  {
    id: 4,
    question: "How old do I need to be to rent a car?",
    answer:
      "The minimum driver age is 21 for economy classes and 25 for premium and sports cars. A driving license held for at least one year is also required.",
  },
  {
    id: 5,
    question: "Can I pick up the car in one city and return it in another?",
    answer:
      "Yes, we offer a One-Way Rental service. Simply select a different return location (e.g., an airport or another partner point) during booking. This service may incur an additional fee.",
  },
  {
    id: 6,
    question: "What is the fuel policy?",
    answer:
      "The 'Full-to-Full' policy applies. You receive the car with a full tank of fuel and are expected to return it in the exact same condition.",
  },
  {
    id: 7,
    question: "What does Full Protection insurance cover?",
    answer:
      "Full Protection eliminates the driver's financial liability in the event of body damage, theft, scratches, or glass and tire damage, reducing the deductible to zero.",
  },
  {
    id: 8,
    question: "Can an additional driver drive the car?",
    answer:
      "Yes, an additional driver can be added to the agreement. This person must meet the same age requirements and present a valid driving license at vehicle pickup.",
  },
  {
    id: 9,
    question: "What should I do in case of a breakdown or collision?",
    answer:
      "All our cars are covered by 24/7 roadside assistance. In the event of any incident, contact our emergency hotline listed in your rental documents immediately.",
  },
  {
    id: 10,
    question: "Can I cancel or modify my reservation?",
    answer:
      "Free cancellation or modification is available up to 24 hours before the scheduled pickup time, either directly in your user panel or by contacting us.",
  },
];
