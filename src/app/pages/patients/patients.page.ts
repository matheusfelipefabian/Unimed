import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/interfaces/patient';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {
  private patient: Patient = {};
  private loading: any;
  private patientId: string = null;
  private patientSubscription: Subscription;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private activeRoute: ActivatedRoute,
    private patientService: PatientService,
    private navCtrl: NavController
  ) {
    this.patientId = this.activeRoute.snapshot.params['id'];
    if(this.patientId) this.loadPatient();
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.patientSubscription) this.patientSubscription.unsubscribe();
  }

  loadPatient(){
    this.patientSubscription = this.patientService.getPatient(this.patientId).subscribe(data =>{
      this.patient = data;
    });
  }

  async savePatient(){
      await this.presentLoading();

      if(this.patientId){
        try{
          await this.patientService.updatePatient(this.patientId, this.patient);
          await this.loading.dismiss();
          this.navCtrl.navigateBack('/home');
        }catch(error){
          this.presentToast('Erro ao tentar salvar');
          this.loading.dismiss();
        }
      }else{
        this.patient.createdAt = new Date().getTime();

        try{
          await this.patientService.addPatient(this.patient);
          await this.loading.dismiss();
          this.navCtrl.navigateBack('/home');
        }catch(error){
          this.presentToast('Erro ao tentar salvar');
          this.loading.dismiss();
        }

      }

  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
