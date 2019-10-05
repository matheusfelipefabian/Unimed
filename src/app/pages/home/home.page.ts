import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Patient } from 'src/app/interfaces/patient';
import { PatientService } from 'src/app/services/patient.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public patients = new Array<Patient>();
  private patientsSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private patientService: PatientService,
    private toastCtrl: ToastController

  ) {
    this.patientsSubscription = this.patientService.getPatients().subscribe(data=>{
      this.patients = data;
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.patientsSubscription.unsubscribe();
  }

  async logout(){
    try{
      await this.authService.logout();
    }catch(error){
      console.error(error);
    }
  }

  async deletePatient(id: string) {
    try {
      await this.patientService.deletePatient(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
