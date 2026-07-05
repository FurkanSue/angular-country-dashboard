import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'
import { ActivatedRoute } from '@angular/router';
import { Country } from 'src/app/core/models/country.model';
import { CountryService } from 'src/app/core/services/country.services';


@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.page.html',
  styleUrls: ['./country-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule]
})
export class CountryDetailPage {

  country?: Country;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService
  ) { }

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.loadCountry(code);
    }
  }
  
  loadCountry(code: string) {
    this.isLoading = true;
    this.error = null;

    this.countryService.getCountryByCode(code).subscribe({
      next: (country) => {
        if (!country) {
          this.error = 'Country not found.';
        } else {
          this.country = country;
        }
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load country.';
        this.isLoading = false;
      }
    });
  }

  getLanguageNames(): string {
    return this.country?.languages.map(language => language.name).join(', ') ?? '';
  }

  getCurrencies(): string {
    return this.country?.currencies.join(', ') ?? '';
  }

}
