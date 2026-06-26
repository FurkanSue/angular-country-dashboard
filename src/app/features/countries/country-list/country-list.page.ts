import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'
import { Country } from 'src/app/core/models/country.model';
import { CountryService } from 'src/app/core/services/country.services';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.page.html',
  styleUrls: ['./country-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class CountryListPage implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  searchTerm = '';
  selectedRegion = '';
  isLoading = false;

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.isLoading = true;

    this.countryService.getAllCountries().subscribe(data => {
      this.countries = data;
      this.filteredCountries = data;
    });
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value?.toLowerCase() || '';
    this.applyFilters();
  }

  onRegionChange(event: any) {
    this.selectedRegion = event.detail.value;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredCountries = this.countries.filter(country => {

      const matchesSearch =
        country.name.toLowerCase().includes(this.searchTerm) || country.code.toLowerCase().includes(this.searchTerm);;

      const matchesRegion =
        !this.selectedRegion || country.continent.name === this.selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }

}
