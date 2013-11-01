define([],function(){
  var formatNumber = {
    thousandLimit: ",", // separador para los miles
    decimalLimit: '.', // separador para los decimales
    unit: "",
    simbol: "",
    decimals: 2,
    formatear:function (num){
      num +='';
      num = num.indexOf('.') !== -1 ? num : num + '.';
      var splitStr = num.split('.');
      var splitLeft = splitStr[0];
      var splitRight = splitStr.length > 1 ? this.decimalLimit + (splitStr[1]+"00000").substr(0,this.decimals) : '';
      switch (this.unit){
      case "K":
	if (parseInt(splitLeft)>1000){
	  splitLeft = splitLeft.substr(0,splitLeft.length-3);
	  splitRight = "";
	} else {
	  this.unit = "";
	};
	break;
      case "M":
	if (parseInt(splitLeft)>1000000){
	  splitLeft = splitLeft.substr(0,splitLeft.length-6);
	  splitRight = "";
	} else {
	  this.unit = "";
	  /*if (parseInt(splitLeft)>1000){
	   splitLeft = splitLeft.substr(0,splitLeft.length-3);
	   this.unit = "K";
	   splitRight = "";
	   }*/ 
	}
	break;
      default:
	this.unit = "";
      }
      var regx = /(\d+)(\d{3})/;
      while (regx.test(splitLeft)) {
	splitLeft = splitLeft.replace(regx, '$1' + this.thousandLimit + '$2');
      }
      return this.simbol + splitLeft  +splitRight + this.unit;
    },
    new:function(num, decimals, simbol, unit){
      this.simbol = simbol ||'';
      this.unit = unit ||'';
      this.decimals = decimals || 2;
      return this.formatear(num);
    }
  };
  return formatNumber;

});
