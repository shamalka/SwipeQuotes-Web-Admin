import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/shared/quote.service';
import { Quote } from 'src/app/shared/quote.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-quote-list',
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit {

  list: Quote[];

  constructor(private service:QuoteService, 
    private firestore: AngularFirestore,
    private toaster:ToastrService) { }

  ngOnInit() {
    this.service.getQuotes().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Quote;
      })
  });
  }

  onEdit(qt: Quote){
    this.service.formData = Object.assign({}, qt);
  }

  onDelete(id: string){
    if(confirm("Are you sure?")){
      this.firestore.doc('quotes/' + id).delete();
      this.toaster.warning("Deleted Successfully", "Quote");
    }
  }

}
