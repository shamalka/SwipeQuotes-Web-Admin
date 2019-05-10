import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/shared/quote.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  constructor(private service:QuoteService, private firestore:AngularFirestore, private toaster:ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      id: null,
      quote: '',
      author: ''
    }
  }

  onSubmit(form:NgForm){
    let data = Object.assign({},form.value);
    delete data.id;
    if(form.value.id==null)
      this.firestore.collection("quotes").add(data);
    else
    this.firestore.doc('quotes/'+form.value.id).update(data);
      this.resetForm(form);
    this.toaster.success('Submited Succesfully','Register');
  }

}
