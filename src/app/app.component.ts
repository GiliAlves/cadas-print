import { Component, OnInit } from '@angular/core';
import { Csv2fireService } from './services/csv2fire.service';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  cadas: Array<{
    nome: string;
    dtNascimento: string;
    numCaixa: string;
    ordem: string;
    observacao: string;
  }> = [];

  options = {
    headers: ["Nome", "Data de Nascimento", "Número da Caixa", "Ordem", "Observacao"],
  };

  constructor(private csv2fireService: Csv2fireService) { }

  ngOnInit(): void {
    this.csv2fireService.getCadas().subscribe(cadas => {
      cadas.forEach(cds => {
        this.cadas.push({
          nome: cds.nome,
          dtNascimento: cds.dtNascimento,
          numCaixa: cds.numCaixa,
          ordem: cds.ordem,
          observacao: cds.observacao
        });
      });
    });
  }

  gerar() {
    console.log(this.cadas[0]);
    new AngularCsv(this.cadas, 'Cadas', this.options);
  }
}
