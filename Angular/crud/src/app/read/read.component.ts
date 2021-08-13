import { Component, OnInit } from '@angular/core';
import { Crud } from '../model/crud';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {
  public cruds: any;

  constructor(private afs: CrudService) {}

  ngOnInit(): void {
    this.afs.getAllValue().subscribe((e) => {
      console.log(e);
      this.cruds = e.map((data) => {
        return {
          id: data.payload.doc.id,
          ...(data.payload.doc.data() as Crud),
        };
      });
    });
  }
  delete(id: any) {
    this.afs.delete(id);
  }
}
