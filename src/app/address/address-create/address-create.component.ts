import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Address } from '../../models/address.model';
import { CountryService } from '../../services/country.service';
import { AddressService } from '../../services/address.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.css']
})
export class AddressCreateComponent implements OnInit {

  public address: Address;
  countries: any[];
  public addressForm: FormGroup;

  constructor(private location: Location, private countryService: CountryService,
    private addressService: AddressService) { }

  ngOnInit(): void {
    this.fillCountries();
    this.addressForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      country: new FormControl('', [Validators.required]),
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

  public createAddress = (addressFormValue) => {
    if (this.addressForm.valid) {
      this.executeAddressCreation(addressFormValue);
    }
  }

  private executeAddressCreation = (addressFormValue) => {

    let address: Address = {
      id: Guid.EMPTY,
      description: addressFormValue.description,
      zipCode: addressFormValue.zipCode,
      city: addressFormValue.City,
      countryId: addressFormValue.countryId
    }

    this.addressService.addAddress(address)
      .subscribe();
  }
 }
