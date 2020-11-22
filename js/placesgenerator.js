
//Wrapper function for "getElementById"
function gid(d){
	return document.getElementById(d);	
}

//input: array
//output: a random item from that array
function randitem(arr){
	//random number between 0 and (arr.length - 1)
	var randidx = Math.floor(Math.random()*(arr.length-1));
	return arr[randidx];
}

//input: HTML selection of datapicker
//input: HTML integer value 'scale'
//output: Renders a box of SQL of {scale} insert statements corresponding to the datatype.
function generatedata(){
	
	var datatype = gid('datapicker').value;
	var scale = gid('scale').value;
	if(parseInt(scale)!=scale || scale <= 0) return; //simple validation
	var data = "";
	
	//run a different function based on the selected datatype and scale.
	switch(datatype){
		case 'landlords':
			data = generatelandlords(scale);
		break;
		case 'tenants':
			data = generatetenants(scale);
		break;
		case 'leases':
			data = generateleases(scale);
		break;
		case 'properties':
			data = generateproperties(scale);
		break;
		case 'payments':
			data = generatepayments(scale);
		break;
	}
	gid('output').innerHTML = data;
}


//input: integer {scale}
//output: {scale} insert statements for landlords as text
function generatelandlords(scale){
	var sql = "";
	var landlordfname, landlordlname, provider, edomain, landlordphone, landlordemail;
	for(var i=0; i<scale; i++){
		
		landlordfname = randitem(fnames);
		landlordlname = randitem(lnames);
		provider = randitem(providers);
		edomain = randitem(edomains);
		landlordphone = randitem(areacodes)
			+ " - "
			+ Math.floor(Math.random()*10)
			+ Math.floor(Math.random()*10)
			+ Math.floor(Math.random()*10)
			+ " - "
			+ Math.floor(Math.random()*10)
			+ Math.floor(Math.random()*10)
			+ Math.floor(Math.random()*10)
			+ Math.floor(Math.random()*10);
		
		landlordemail = `${landlordfname}.${landlordlname}@${provider}.${edomain}`
		sql += `INSERT INTO landlords (landlordfname, landlordlname, landlordphone, landlordemail) VALUES ('${landlordfname}', '${landlordlname}', '${landlordphone}', '${landlordemail}');\n`;
	}
	return sql;
	
}

//input: integer {scale}
//output: {scale} insert statements for tenants as text
function generatetenants(scale){
	var sql = "";
	var tenantfname, tenantlname, provider, edomain, tenantphone, tenantemail;
	for(var i=0; i<scale; i++){
		
		tenantfname = randitem(fnames);
		tenantlname = randitem(lnames);
		provider = randitem(providers);
		edomain = randitem(edomains);
		tenantphone = randitem(areacodes)
			+ " - "
			+ Math.floor(Math.random()*10)
			+ Math.floor(Math.random()*10)
			+ Math.floor(Math.random()*10)
			+ " - "
			+ Math.floor(Math.random()*10)
			+ Math.floor(Math.random()*10)
			+ Math.floor(Math.random()*10)
			+ Math.floor(Math.random()*10);
		
		tenantemail = `${tenantfname}.${tenantlname}@${provider}.${edomain}`
		sql += `INSERT INTO tenants (tenantfname, tenantlname, tenantphone, tenantemail) VALUES ('${tenantfname}', '${tenantlname}', '${tenantphone}', '${tenantemail}');\n`;
	}
	return sql;
	
}

//input: integer {scale}
//output: {scale} insert statements for leases as text
function generateleases(scale){
	var sql = "";
	var currentday, leasestart, leaseend, daysold;
	
	for(var i=0; i<scale; i++){
		
		currentday = new Date();
		leasestart = new Date();
		leaseend = new Date();
		//console.log(currentday.toLocaleString());
		
		//some number of days up to 10 years in the past
		daysold = Math.floor(Math.random()*(10*365));
	
		//generate a random date up to 10 years in the past.
		leasestart.setDate(currentday.getDate() - daysold);
		//add approx one year to the lease start
		leaseend.setDate(leasestart.getDate() - daysold + 365);
		
		dleasestart = leasestart.getFullYear() +"-"+ leasestart.getMonth() +"-"+ leasestart.getDate();
		dleaseend = leaseend.getFullYear() +"-"+ leaseend.getMonth() +"-"+ leaseend.getDate();
		
		//YOUR TASK: Generate random foreign key numbers to associate the lease with a property.
		//YOUR TASK: Generate random foreign key numbers to associate the lease with a landlord.
		//YOUR TASK: Generate random foreign key numbers to associate the lease with one or more tenants.
		
		sql += `INSERT INTO leases (leasestart, leaseend) VALUES ('${dleasestart}','${dleaseend}');\n`;
	}
	
	return sql;
	
}

//input: integer {scale}
//output: {scale} insert statements for properties as text
function generateproperties(scale){
	var sql = "";
	
	
	var sqft, bed, bath, propertytype, propertynum, propertyname, streettype;
	
	for(var i=0; i<scale; i++){
		
		//random number between 500 and 1100
		sqft = (Math.floor(Math.random()*5) + 6) * 100;
		//each 400 sqft adds a bed
		bed = Math.floor(sqft/400); 
		//each 500sqft adds a bath, randomly adding half a bath.
		//randomly adds 0.5 so could be 1.5, 2.5, etc.
		bath = Math.floor(sqft/500) + 0.5 * Math.round(Math.random());
		
		propertytype = randitem(propertytypes);
		//address number
		propertynum = Math.floor(Math.random()*1400) + 50;
		//random address name
		propertyname = randitem(propertyprefixes) + randitem(propertysuffixes);
		propertystreettype = randitem(propertystreettypes);
		
		//YOUR TASK: Generate a random foreign key to associate the property with a landlord.
		
		propertyaddr = `${propertynum} ${propertyname} ${propertystreettype}`;
		
		sql += `INSERT INTO properties (propertyaddr, propertysqft, propertybed, propertybath, propertytype) VALUES ('${propertyaddr}', '${sqft}', '${bed}', '${bath}', '${propertytype}');\n`;
	}
	return sql;
}

//input: integer {scale}
//output: {scale}*11 insert statements for payments as text, including firstmo and lastmo
function generatepayments(scale){
	
	var sql = "";
	
	
	for(var i=0; i<scale; i++){
		var currentday = new Date();
		var paymentdate = new Date();
		var dpaymentdate = "";
		//some number of days up to 10 years in the past
		daysold = Math.floor(Math.random()*(10*365));
		
		//Ideally the payments would be exactly between the start lease date and end lease date.
		//You can use a stored procedure to update lease times to match payment history.
		//INPUT LID INT(10) UNSIGNED
		//DECLARE start DATETIME
		//DECLARE end DATETIME
		//select min(paymentdate), max(paymentdate) into start,finish from payments where payments.leaseid = LID;
		//update leases set leasestart = start, leaseend = finish where leases.leaseid=LID;
		
		paymentdate.setDate(currentday.getDate() - daysold);
		
		
		//random number between 600 and 1300
		var monthly = Math.floor(Math.random()*60 + 70) * 10;
		var first = monthly*2;
		
		for(var j = 0; j<12; j++){
			
			if(j==0) payment = first;
			else payment = monthly;	
			
			//add a month
			paymentdate.setDate(paymentdate.getDate() + 31);
			dpaymentdate = paymentdate.getFullYear() +"-"+ paymentdate.getMonth() +"-"+ paymentdate.getDate();
			
			//YOUR TASK: Generate random foreign key to associate this payment with a lease
			//YOUR TASK: Generate a random foreign key to associate this payment with a tenant
			
			sql += `INSERT INTO payments (paymentamount, paymentdate) VALUES (${dpaymentdate},${payment});\n`;	
		}
		
	}
	return sql;
}