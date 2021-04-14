import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Address } from '../../models/address.model';
import { CountryService } from '../../services/country.service';
import { AddressService } from '../../services/address.service';
import { ActivatedRoute} from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-address-update',
  templateUrl: './address-update.component.html',
  styleUrls: ['./address-update.component.css']
})
export class AddressUpdateComponent implements OnInit {

  countries: any[];
  public addressForm: FormGroup;
  countrySelected: Address;

  constructor(private location: Location, private countryService: CountryService,
    private addressService: AddressService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAddressById();
    this.fillCountries();
    this.addressForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      country: new FormControl('', [Validators.required]),
    });
  }

  getAddressById(): void {
    let id = this.route.snapshot.paramMap.get("id");

    this.addressService.getAddressById(id)
      .subscribe((data: any) => {
        this.addressForm.setValue({
          description: data.address.description,
          zipCode: data.address.zipCode,
          city: data.address.city,
          country: data.address.country
        });

        this.countrySelected = data.address;
      });
  }

  fillCountries(): void {
    this.countryService.getCountries()
      .subscribe((data: any[]) => this.countries = data);
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.addressForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  public updateAddress(addressFormValue): void {
    if(this.addressForm.valid){
      this.executeAddressUpdation(addressFormValue);
    }
  }

  private executeAddressUpdation(addressFormValue): void {
    let id = this.route.snapshot.paramMap.get("id");
    var address: Address = {
      id: id,
      description: addressFormValue.description,
      zipCode: addressFormValue.zipCode,
      city: addressFormValue.city,
      countryId: addressFormValue.countryId
    }

    this.addressService.updateAddress(id, address)
      .subscribe();
  }

}
