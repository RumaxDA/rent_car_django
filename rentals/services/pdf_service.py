from fpdf import FPDF
import os
from django.conf import settings
from decimal import Decimal


class InvoicePDF(FPDF):
    def __init__(self, rental):
        super().__init__()
        self.rental = rental

        font_path = os.path.join(settings.BASE_DIR, "static", "fonts", "DejaVuSans.ttf")
        self.add_font("DejaVu", "", font_path, uni=True)

        self.add_page()
        self.set_font("DejaVu", size=12)

    def build_content(self):
        self.set_font("DejaVu", "", 16)
        # Invoice Title
        invoice_num = (
            f"F/{self.rental.actual_return_date.strftime('%Y/%m')}/{self.rental.id}"
        )
        self.cell(0, 10, f"FAKTURA VAT NR {invoice_num}", ln=True, align="C")
        self.ln(10)

        # Section Buyer / Seller
        self.set_font("DejaVu", "", 10)
        self.cell(95, 8, "SELLER:", ln=0)
        self.cell(95, 8, "BUYER:", ln=1)

        self.cell(95, 8, "RentalCompany RentCar Sp. z o.o.", ln=0)
        self.cell(
            95,
            8,
            f"Name: {self.rental.user.username} Email: {self.rental.user.email}",
            ln=1,
        )
        self.ln(10)

        gross_amount = self.rental.total_price
        vat_rate = Decimal("0.23")
        net_amount = round(gross_amount / (Decimal("1") + vat_rate), 2)
        vat_amount = round(gross_amount - net_amount, 2)
        # ------------------------------------------------

        # Rysowanie tabeli
        self.cell(90, 10, "Service", border=1)
        self.cell(30, 10, "Netto", border=1)
        self.cell(30, 10, "VAT 23%", border=1)
        self.cell(40, 10, "Brutto", border=1, ln=1)

        # Wstawianie wyliczonych zmiennych do wiersza
        self.cell(
            90, 10, f"Rent {self.rental.car.brand} {self.rental.car.model}", border=1
        )
        self.cell(30, 10, f"{net_amount} USD", border=1)
        self.cell(30, 10, f"{vat_amount} USD", border=1)
        self.cell(40, 10, f"{gross_amount} USD", border=1, ln=1)
