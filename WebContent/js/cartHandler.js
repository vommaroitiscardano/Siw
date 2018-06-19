/*
 * switch tra i tab per selezionare il metodo di pagamento
 */
function paymentTab(element){
	var _this = $(element);
	
	if(_this.hasClass("p_tab")){
		$('.bank_tab').hide();
		$('.paypal_tab').show();
	}
	else{
		$('.bank_tab').show();
		$('.paypal_tab').hide();
	}
}