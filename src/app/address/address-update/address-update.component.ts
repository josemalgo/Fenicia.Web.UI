import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Address } from '../../models/address.model';
import { CountryService } from '../../services/country.service';
import { AddressService } from '../../services/address.service';
import { ActivatedRoute} from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-address-update',
  templateUrl: './address-update.component.html',
  styleUrls: ['./address-update.component.css']
})
export class AddressUpdateComponent implements OnInit {

  countries: any[];
  public addressForm: FormGroup;

  constructor(private countryService: CountryService, private addressService: AddressService, 
    public dialogRef: MatDialogRef<AddressUpdateComponent>,
    @Inject (MAT_DIALOG_DATA) public id: string) { }

  ngOnInit(): void {

    this.addressForm = new FormGroup({
      description: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      country: new FormControl('', [Validators.required]),
    });

    this.fillCountries();
    this.getAddressById();
  }

  getAddressById(): void {
    this.addressService.getAddressById(this.id)
      .subscribe((data: any) => {
        this.addressForm.setValue({
          description: data.address.description,
          zipCode: data.address.zipCode,
          city: data.address.city,
          country: data.address.country
        });

      });
  }

  fillCountries(): void {
    this.countryService.getCountries()
      .subscribe((data: any) => this.countries = data.countries);
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.addressForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.dialogRef.close();
  }

  public updateAddress(addressFormValue): void {
    if(this.addressForm.valid){
      this.executeAddressUpdation(addressFormValue);
    }
  }

  private executeAddressUpdation(addressFormValue): void {
    let address: Address = {
      id: this.id,
      description: addressFormValue.description,
      zipCode: addressFormValue.zipCode,
      city: addressFormValue.city,
      countryId: addressFormValue.country
    }

    this.dialogRef.close(address);
  }

}
