export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    id: 1,
    question: "Jakie dokumenty są wymagane do wypożyczenia samochodu?",
    answer:
      "Do podpisania umowy potrzebujesz ważnego prawa jazdy (posiadanego od co najmniej 12 miesięcy), dowodu osobistego lub paszportu oraz karty płatniczej na imię i nazwisko głównego kierowcy.",
  },
  {
    id: 2,
    question: "Czy jest pobierana kaucja zwrotna?",
    answer:
      "Tak, podczas odbioru auta na karcie płatniczej blokowana jest kaucja zwrotna. Jej wysokość zależy od klasy wybranego pojazdu. Środki są odblokowywane automatycznie po zwrocie nieuszkodzonego auta.",
  },
  {
    id: 3,
    question: "Czy obowiązuje limit kilometrów?",
    answer:
      "Wszystkie nasze standardowe wynajmy krótkoterminowe posiadają brak limitu kilometrów na terytorium Polski. Przy wyjazdach zagranicznych obowiązują indywidualne ustalenia.",
  },
  {
    id: 4,
    question: "Ile lat muszę mieć, aby wynająć auto?",
    answer:
      "Minimalny wiek kierowcy to 21 lat dla klas ekonomicznych oraz 25 lat dla aut klasy premium i sportowych. Wymagane jest również posiadanie prawa jazdy od minimum roku.",
  },
  {
    id: 5,
    question: "Czy samochód mogę odebrać i zwrócić w innym mieście?",
    answer:
      "Tak, oferujemy usługę One-Way Rental. Podczas składania rezerwacji wystarczy wskazać inną lokalizację zwrotu (np. lotnisko lub inny punkt partnerski). Usługa może wiązać się z dodatkową opłatą.",
  },
  {
    id: 6,
    question: "Jaka jest polityka paliwowa?",
    answer:
      "Obowiązuje zasada 'pełny do pełnego' (Full-to-Full). Odbierasz auto z pełnym zbiornikiem paliwa i w takim samym stanie powinieneś je zwrócić.",
  },
  {
    id: 7,
    question: "Co zawiera pełne ubezpieczenie (Full Protection)?",
    answer:
      "Pełne ubezpieczenie znosi odpowiedzialność finansową kierowcy w przypadku uszkodzenia nadwozia, kradzieży, zarysowań czy uszkodzeń szyb i opon, redukując wkład własny do zera.",
  },
  {
    id: 8,
    question: "Czy auto może prowadzić dodatkowy kierowca?",
    answer:
      "Tak, istnieje możliwość dopisania drugiego kierowcy do umowy. Osoba ta musi spełniać te same wymagania wiekowe i przedstawić ważne prawo jazdy podczas odbioru pojazdu.",
  },
  {
    id: 9,
    question: "Co zrobić w przypadku awarii lub kolizji?",
    answer:
      "Wszystkie nasze auta objęte są całodobową opieką Assistance 24/7. W razie jakiegokolwiek zdarzenia niezwłocznie skontaktuj się z naszą infolinią alarmową podaną w dokumentach wynajmu.",
  },
  {
    id: 10,
    question: "Czy mogę odwołać lub zmienić rezerwację?",
    answer:
      "Bezpłatne odwołanie lub zmiana rezerwacji jest możliwa do 24 godzin przed planowanym terminem odbioru samochodu bezpośrednio w panelu użytkownika lub kontaktując się z nami.",
  },
];
