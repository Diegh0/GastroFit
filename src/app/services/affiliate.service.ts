import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AffiliateService {

  // Tu Affiliate Tag de Amazon Associates
  private affiliateTag = 'gastrofitapp-21';

  /**
   * Construye la URL de Amazon para el ASIN proporcionado,
   * incluyendo tu tag de afiliado.
   */
  getAmazonLink(asin: string): string {
    return `https://www.amazon.es/dp/${asin}/?tag=${this.affiliateTag}`;
  }
}
