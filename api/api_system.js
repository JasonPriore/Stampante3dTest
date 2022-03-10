
//simulo la stampante collegata
class Stampante{
  Temp_ugello;
  Temp_ambiente;
  v_RMS;
  Status;
  Ventola;
  Tempo_mancante;
  spegnimento;
  log;
  constructor(tu,ta,rms,s,v,t){
    this.Temp_ugello = tu;
    this.Temp_ambiente = ta;
    this.v_RMS = rms;
    this.Status = s;
    this.Ventola = v;
    this.Tempo_mancante = t;
    this.log = "\n";
  }

    get status(){
      return this.Status;
    }
    get ventola(){
      return this.Ventola;
    }
    get tempo(){
      return this.Tempo_mancante;
    }

    get ore(){
      let ore = this.Tempo_mancante.split(":");
      return ore[0];
    }

    get minuti(){
      let minuti = this.Tempo_mancante.split(":");
      return minuti[1];
    }

    get secondi(){
      let secondi = this.Tempo_mancante.split(":");
      return secondi[2];
    }
    get ugello(){
      return this.Temp_ugello;
    }

    get ambiente(){
      return this.Temp_ambiente;
    }

    get rms(){
      return this.v_RMS;
    }

    get log(){
      return thi.log;
    }
    modifica_tempo(valore_tempo){
      this.Tempo_mancante = valore_tempo;
    }
    modifica_status(valore_status){
      this.Status = valore_status;
    }

    modifica_ventola(valore_ventola){
      this.Ventola = valore_ventola;
    }
    modifica_ugello(valore_ugello){
      this.Temp_ugello = valore_ugello;
    }

    modifica_ambiente(valore_ambiente){
      this.Temp_ambiente = valore_ambiente;
    }

    modifica_rms(valore_rms){
      this.v_RMS = valore_rms;
    }

   go_to_temp(){
     setTimeout(() => {
     this.log = this.log +"Avviato\n";
     this.log = this.log +"Riscaldamento ugello\n";
   }, 2000);
     var a_temperatura = setInterval(() => {
       this.Temp_ugello = this.Temp_ugello + 10;
       if(this.Temp_ugello == 170){
         this.v_RMS = 1;
         clearInterval(a_temperatura);
         this.log = this.log +"Macchinario arrivato a temperatura\n";
       }
     }, 1000);
   }

   imprevisto(){
     this.log = this.log +"imprevisto Attivo"+"\n";
      this.Temp_ugello = this.Temp_ugello + 10;
      this.v_RMS = this.v_RMS + 1;
   }

   abort(){
     var the = this;
     this.Ventola = "on";
     this.log = this.log +"Accensione Ventola di sicurezza\n";
     this.spegnimento = "si";
     var d_temperatura = setInterval(() => {
       this.Temp_ugello = this.Temp_ugello - 10;
       this.v_RMS = 1;
       if(this.Temp_ugello == 10){
         clearInterval(d_temperatura);
         the.stop();
       }
     }, 1000);
   }

   stop(){
     if(this.Status == "on"){
         this.Status = "off";
         this.log = this.log +"Macchinario spento\n";
         this.spegnimento = "si";
         this.Ventola = "off";
         setTimeout(() => {
         this.Temp_ugello = 0;
         this.v_RMS = 0;
         }, 1000);
     }else {
       this.log = this.log +"Macchinario già spento\n";
       this.spegnimento = "si";
     }
   }


   check(){
     var the = this;
     if(this.Temp_ugello >= 180 && this.v_RMS >= 2){
       this.log = this.log +"Attenzione macchinario in surriscaldamento" +"\n";
       alert("Attenzione Temperatura sopra il limite");
      the.abort();
    }else if (this.Temp_ugello >= 190 && this.v_RMS >= 2) {
      this.log = this.log +"Attenzione macchinario in surriscaldamento" +"\n";
      alert("Attenzione Temperatura sopra il limite");
      the.stop();
    }else if (this.Temp_ugello <= 170 && this.v_RMS == 1) {

    }
   }

   run(){
     var the = this;
     this.log = this.log +"Avviamento..\n";
     var in_funzione = setInterval(() => {

     if(this.Status == "off"){
       if(this.spegnimento != "si"){
        this.Status = "on";
        the.go_to_temp();
      }else{
       clearInterval(in_funzione);
       this.spegnimento = "no";
      }
     }else{
       if(this.spegnimento != "si"){
       the.check();
      }
     }

   }, 1000);



   }

}

//let stampante = new Stampante(100,22,0,"off","off","00:00:00","Proggetto di prova");
//stampante.run();
