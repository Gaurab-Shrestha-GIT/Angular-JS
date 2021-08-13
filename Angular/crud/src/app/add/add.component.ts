import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Crud } from '../model/crud';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private afs: CrudService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.afs.getAllValue;
    this.route.params.subscribe((e) => {
      let id = e.id;
      this.dataId = id;
      if (id != null) {
        this.afs.getOneValue(id).subscribe((e) => {
          let data: any = e.data();
          this.profileForm = this.fb.group({
            name: data['name'],
            age: data['age'],
            color: data['color'],
          });
        });
      }
    });
  }

  public profileForm = this.fb.group({
    name: ['', Validators.required],
    age: ['', Validators.required],
    color: ['', Validators.required],
  });

  public dataId: any;

  addToDatabase(value: Crud) {
    let id = this.dataId;
    if (id == null) {
      this.afs.addToFirebase(value);
    } else {
      this.afs.update(id, value).then((e) => {
        console.log('updated');
      });
    }
  }
}
