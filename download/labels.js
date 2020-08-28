console.log('===378,379,380,381,',data);
const { wardSummaryData, lable,dropletNumUnitListForPrint } = data;
Lodop.SET_PRINT_PAGESIZE(1,'75mm','75mm',"CZZBQ");
if (wardSummaryData) {
  const { batchName, wardName, totalNum, printNo, exitNum, isRepeat, printDate, printName, timeRange } = wardSummaryData;
  // console.log(printName);
  // Lodop.SET_PRINT_PAGESIZE(1,'75mm','72mm','');
  
  Lodop.ADD_PRINT_TEXT("5.82mm","0mm",`72mm`,"6.00mm",`${wardName || ''}`);
  Lodop.SET_PRINT_STYLEA(0,"FontSize",18);
  Lodop.SET_PRINT_STYLEA(0,"Alignment",2);
  Lodop.SET_PRINT_STYLEA(0,"Bold",1);
  Lodop.ADD_PRINT_TEXT("3.7mm","59.27mm","9mm","7.94mm",`${isRepeat ? '重' : ''}`);
  Lodop.SET_PRINT_STYLEA(0,"FontSize",14);
  Lodop.ADD_PRINT_TEXT("16.67mm","15.00mm","35.00mm","6.29mm",`共${totalNum || ''}包`);
  Lodop.SET_PRINT_STYLEA(0,"FontSize",18);
  Lodop.SET_PRINT_STYLEA(0,"Bold",1);
  Lodop.ADD_PRINT_TEXT("16.67mm","40.00mm","35.00mm","6.29mm",`${timeRange}`);
  Lodop.SET_PRINT_STYLEA(0,"FontSize",18);
  Lodop.SET_PRINT_STYLEA(0,"Bold",1);
  Lodop.ADD_PRINT_BARCODE("24.61mm","22.23mm","33.34mm","27.25mm","QRCode",`${printNo}`);
  Lodop.ADD_PRINT_TEXT("60.85mm","19.40mm","38.36mm","5.29mm",`${printDate}`);
  Lodop.SET_PRINT_STYLEA(0,"FontSize",12);
  Lodop.ADD_PRINT_TEXT("53.45mm","24.08mm","35.1mm","5.29mm",`${printNo}`);
  Lodop.SET_PRINT_STYLEA(0,"FontSize",12);
  console.log('===done 380', wardSummaryData);
  Lodop.NewPageA();
}
if (data && lable.length > 0) {
  const chemoImg = document.querySelector('#page3').innerHTML; // 化疗标签
  let soluteMedList_outer = [];
  // 判断上一个 溶质药品和现在的是否相同
  // const isIdentical = (medList) => {
  //   const lists = medList || [];
  //   const curSoluteMedList = lists.filter(item => item.solventSolute === 2);
  //   const soluteMed = curSoluteMedList.map(item => item.medicationId); // 当前数据的溶质药品
  //   const oldSoluteMed = soluteMedList.map(item => item.medicationId); // 之前的溶质药品
  //   if (JSON.stringify(soluteMed) !== JSON.stringify(oldSoluteMed)) { // 溶质药品不同
  //     soluteMedList = [...curSoluteMedList];
  //     return false;
  //   }
  //   return true;
  // };
  // 每个患者
  for (let lableInd = 0; lableInd < lable.length; lableInd += 1) {
    if (lable[lableInd]) {
      let curMed_outer = 1; // 每一个患者的第一个总标签
      // 每一个处方
      for (let detailInd = 0; detailInd < lable[lableInd].detail.length; detailInd += 1) {
        const detailItem = lable[lableInd].detail[detailInd];
        if (detailItem) {
          // 总标签
          // 溶质药品不同  添加一个溶质药品列表标签
          // 第一张标签或者 有不同的溶质药品 添加一张总标签
          // const hasDefSolute = isIdentical(detailItem.detailPrintDTOList); // 是否有不同的溶质药品

          const lists = detailItem.detailPrintDTOList || [];
          const curSoluteMedList = lists.filter(item => item.solventSolute === 2);
          const soluteMed = curSoluteMedList.map(item => item.medicationId); // 当前数据的溶质药品
          const oldSoluteMed = soluteMedList_outer.map(item => item.medicationId); // 之前的溶质药品
          if (JSON.stringify(soluteMed) !== JSON.stringify(oldSoluteMed)) { // 溶质药品不同
            soluteMedList_outer = [...curSoluteMedList];
            // return false;
          }
          if (curMed_outer === 1 || (JSON.stringify(soluteMed) !== JSON.stringify(oldSoluteMed) && soluteMedList.length > 0)) {
            let totalData = {
              ...lable[lableInd],
              sendBatchName: lable[lableInd].detail[0].sendBatchName || '',
              medLength: lable[lableInd].detail ? lable[lableInd].detail.length : 1,
              provideDate: lable[lableInd].provideDate, // moment(lable[lableInd].provideDate).format('MM-DD HH:mm'),
              soluteMedList: soluteMedList_outer,
              curMed: curMed_outer, // 第几个总标签
              // printName: totalPrintName,
            };
            // console.log('总标签  溶质药品', soluteMedList);
            console.log('===381',totalData);
            const { provideOrderNumber, sendBatchName, medLength, provideDate, soluteMedList, curMed } = totalData;
            Lodop.SET_PRINT_STYLE('fontSize', 10);
            // Lodop.SET_PRINT_PAGESIZE(1,'75mm','75mm',"CZZBQ");
            if (curMed === 1) {
              console.log('第一个总标签')
              Lodop.ADD_PRINT_TEXT("7mm",0,"75mm","5mm", provideOrderNumber);
              Lodop.SET_PRINT_STYLEA(0,"Alignment",2);
              Lodop.ADD_PRINT_BARCODE("12mm","10mm","55mm","10mm","PDF417", provideOrderNumber);
              Lodop.ADD_PRINT_TEXT("24mm",0,"75mm","5mm", `共${medLength}袋`);
              Lodop.SET_PRINT_STYLEA(0,"Alignment",2);
              Lodop.ADD_PRINT_TEXT("30mm",0,"75mm","5mm", provideDate);
              Lodop.SET_PRINT_STYLEA(0,"Alignment",2);
              Lodop.SET_PRINT_STYLEA(0,"fontSize", 16);
              Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
              for (let medInd = 0; medInd < soluteMedList.length; medInd += 1) {
                if (soluteMedList[medInd]) {
                  Lodop.ADD_PRINT_TEXT(`${38 + medInd * 4}mm`, '2mm', '70mm', '3mm', `${soluteMedList[medInd].medicationName}${soluteMedList[medInd].specification}`)
                }
              }
            } else {
              for (let medInd = 0; medInd < soluteMedList.length; medInd += 1) {
                Lodop.ADD_PRINT_TEXT(`${2 + medInd * 4}mm`, '2mm', '70mm', '3mm', `${soluteMedList[medInd].medicationName}${soluteMedList[medInd].specification}`)
              }
            }
            console.log('===done 381', totalData);
            Lodop.NewPageA();
            // 总标签
            // const templateIdFirst = 'FH0142.381';
            // this.printer.print(templateIdFirst, totalData, {
            //   taskTitleFormat({ provideDate }) {
            //     return `总标签 - ${provideDate}【${templateIdFirst}】`;
            //   },
            // });
            
          }
          // 药品明细
          const patientInfo = {
            ...lable[lableInd],
            printTime: '', // moment().format('YYYY-MM-DD HH:mm'),
            configTime: lable[lableInd].provideDate || '', // moment(lable[lableInd].provideDate).format('HH:mm'),
            curMed: curMed_outer,
            medLength: lable[lableInd].detail ? lable[lableInd].detail.length : 1,
            executivePlanDate: detailItem.executivePlanDate || '', // ? moment(detailItem.executivePlanDate).format('YYYY-MM-DD HH:mm') : '',
          };
          // detailItem.printName = detailItem.specialDrugs === 1 || detailItem.specialDrugs === 2 ? printerName : chemoPrintName;
          detailItem.dropletNumUnit = dropletNumUnitListForPrint[detailItem.dropletNumUnit];
          detailItem.chemoImg = chemoImg;
          detailItem.configStorageRequire = Array.isArray(detailItem.configStorageRequire) ? detailItem.configStorageRequire.join('、') : detailItem.configStorageRequire;
          if (detailItem.specialDrugs === 3) { // 化疗
            console.log('化疗-=-=');
            // this.props.myPrint.exejs(restoreHtml(chemoTemp), 'printData', printInfo, LODOP);
            // Lodop.SET_PRINT_PAGESIZE(1, '75mm', '72mm', 'HZCZ');
            const { locationName, bedNumber, patientName, medicalRecordNo, sex, age, executivePlanDate, configTime, curMed, medLength } = patientInfo;
            const { frequency, frequencyExecutive, useage, everyoneOrderGroupNoUuid, dropletNum, dropletNumUnit, configRemarkInfo, configStorageRequire, staticConfig, sendBatchName, printFlag, chemoImg, checkJobNumber, orderedJobNumber, nurseJobNumber, liquidVolume, orderRemark  } = detailItem;
            var curCount = 0;
            const sumLen = detailItem.detailPrintDTOList.length;
            const pageSum = Math.floor(sumLen/4) + ((sumLen - Math.floor(sumLen/4) * 4) % 4 > 0 ? 1 : 0);
            // 化疗分两页
            const medPrint = (pageNum) => {
            Lodop.ADD_PRINT_TEXTA('locationName', '0mm', '0mm', '32mm', '5mm', locationName || '');
            Lodop.SET_PRINT_STYLEA(0, 'FontSize', 14);
            Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
            Lodop.ADD_PRINT_LINE('6mm', '0mm', '6mm', '30mm');
            Lodop.ADD_PRINT_TEXTA('bedNumber', '7mm', '-3mm', '13mm', '6mm', bedNumber || '');
            Lodop.SET_PRINT_STYLEA(0, 'FontSize', 14);
            Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
            Lodop.SET_PRINT_STYLEA(0, 'Alignment', 3);
            Lodop.ADD_PRINT_TEXT('7mm', '10mm', '3mm', '6mm', '床');
            Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
            Lodop.ADD_PRINT_TEXTA('patientName', '7mm', '14mm', '23mm', '6mm', patientName || '');
            Lodop.SET_PRINT_STYLEA(0, 'FontSize', 14);
            Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
            Lodop.ADD_PRINT_TEXTA('sex', '13mm', '0mm', '5mm', '5mm', sex || '');
            Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
            Lodop.ADD_PRINT_TEXTA('age', '13mm', '4mm', '9mm', '5mm', age || '');
            Lodop.ADD_PRINT_TEXTA('sendBatchName', '13mm', '12mm', '13mm', '5mm', sendBatchName);
            Lodop.SET_PRINT_STYLEA(0, 'FontSize', 12);
            Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
            Lodop.ADD_PRINT_TEXTA('staticConfig', '13mm', '24mm', '13mm', '5mm', `${staticConfig === 1 ? '配置' : '打包'}`);
            Lodop.SET_PRINT_STYLEA(0, 'FontSize', 11);
            Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
            pageNum === 1 && Lodop.ADD_PRINT_BARCODE('0mm', '34mm', '20mm', '20mm', 'QRCode', everyoneOrderGroupNoUuid || '');
            Lodop.ADD_PRINT_TEXTA('medicalRecordNo', '0mm', '52mm', '25mm', '5mm', medicalRecordNo || '');
            Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
            Lodop.SET_PRINT_STYLEA(0, 'LineSpacing', -5);
            Lodop.ADD_PRINT_TEXTA('everyoneOrderGroupNoUuid', '6mm', '52mm', '25mm', '5mm', everyoneOrderGroupNoUuid || '');
            Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
            Lodop.SET_PRINT_STYLEA(0, 'LineSpacing', -5);
            Lodop.ADD_PRINT_TEXTA('printFlag', '10mm', '52mm', '18mm', '8mm', printFlag === 1 ? '重' : '');
            Lodop.SET_PRINT_STYLEA(0, 'FontSize', 20);
            Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
            
            Lodop.ADD_PRINT_TEXTA('useage', '17mm', '0mm', '18mm', '4mm', useage || '');
            Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
            Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
            Lodop.ADD_PRINT_TEXTA('frequencyExecutive', '17mm', '16mm', '15mm', '4mm', frequencyExecutive || '');
            Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
            Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
            Lodop.ADD_PRINT_TEXTA('executivePlanDate', '17mm', '29mm', '38mm', '4mm', executivePlanDate || '');
            Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
            Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
            Lodop.ADD_PRINT_TEXT('17mm', '64mm', '10mm', '4mm', `${curCount + 1}/${pageSum}`);
            Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
            Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
            
            Lodop.ADD_PRINT_LINE('21mm', '0mm', '21mm', '75mm');
            Lodop.ADD_PRINT_TEXT('22mm', '0mm', '30mm', '4mm', '药品/规格');
            Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
            Lodop.SET_PRINT_STYLEA(0, 'Alignment', 2);
            Lodop.ADD_PRINT_TEXTA('liquidVolume', '22mm', '35mm', '15mm', '4mm', `${liquidVolume ? (liquidVolume + 'ml') : ''}`);
            Lodop.ADD_PRINT_TEXT('22mm', '49mm', '12mm', '4mm', '剂量');
            Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
            Lodop.SET_PRINT_STYLEA(0, 'Alignment', 3);
            Lodop.ADD_PRINT_TEXT('22mm', '60mm', '12mm', '4mm', '数量');
            Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
            Lodop.SET_PRINT_STYLEA(0, 'Alignment', 3);
            Lodop.ADD_PRINT_LINE('26mm', '0mm', '26mm', '75mm');
            for (let medInd = 0; medInd < 4 && (curCount * 4 + medInd) < detailItem.detailPrintDTOList.length; medInd += 1) {
                const { medicationName, specification, dosage, dosageUnit, actualQuantity, unit, doseSmallPackageRatio, squareNotice, advice, selfMadeMedicine } = detailItem.detailPrintDTOList[curCount * 4 + medInd];
                Lodop.ADD_PRINT_TEXTA('medicationName', `${(medInd * 4) + 27}mm`, '0mm', '50mm', '4mm', `${advice ? '[嘱]' : ''}${selfMadeMedicine === 1 ? '[备]' : ''}${medicationName}${specification}` || '');
                Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
            if (advice || selfMadeMedicine) { Lodop.SET_PRINT_STYLEA(0, 'Bold', 1); Lodop.SET_PRINT_STYLEA(0, 'Underline', 1); Lodop.SET_PRINT_STYLEA(0, 'FontName', '黑体'); } 
                Lodop.ADD_PRINT_TEXTA('dosage', `${(medInd * 4) + 27}mm`, '45mm', '17mm', '4mm', `${dosage || ''}${dosageUnit}`);
                Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
                Lodop.SET_PRINT_STYLEA(0, 'Alignment', 3);
                Lodop.ADD_PRINT_TEXTA('actualQuantity', `${(medInd * 4) + 27}mm`, '59mm', '10mm', '4mm', `${actualQuantity || ''}${unit}`);
                Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
                Lodop.SET_PRINT_STYLEA(0, 'Alignment', 3);
                if (squareNotice === 1) {
                Lodop.ADD_PRINT_RECT(`${(medInd * 4) + 27}mm`, '47mm', '15mm', '3.5mm');
                }
            }
            const html = `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>Document</title>
            </head>
            <body>
            <div style='width: 100%; font-size: 14px; margin: 0; padding: 0; height: 22mm; overflow: hidden;'>
                <div>成品输液储存:${configStorageRequire || ''}</div>
                <span style='margin-right: 10px;'>${dropletNum || ''}${dropletNumUnit || ''}</span>
                <span>${configRemarkInfo || ''}</span>
                <div>医嘱备注:${orderRemark || ''}</div>
            </div>
            </body>
            </html>
            <style>
              *{
                font-family: "Microsoft YaHei";
               }
            </style>
            `;
            pageNum === 1 && curCount === 0 && Lodop.ADD_PRINT_HTM('43mm', 0, '60mm', '22mm', html);
            if (pageNum === 2) {
                Lodop.ADD_PRINT_TEXT('50mm', 0, '65mm', '20mm', '外袋标签');
                Lodop.SET_PRINT_STYLEA(0, 'FontSize', 20);
                Lodop.SET_PRINT_STYLEA(0, 'Italic', 1);
                Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
            }
            
            Lodop.ADD_PRINT_IMAGE('48mm', '62mm', '13mm', '20mm', chemoImg);
            
            Lodop.ADD_PRINT_LINE('65mm', '0mm', '65mm', '75mm', 2);
            Lodop.ADD_PRINT_TEXT('66mm', '0mm', '12mm', '4mm', '医生:');
            Lodop.ADD_PRINT_TEXTA('checkJobNumber', '66mm', '9mm', '16mm', '4mm', orderedJobNumber);
            Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
            Lodop.ADD_PRINT_TEXT('66mm', '22mm', '12mm', '4mm', '审方:');
            Lodop.ADD_PRINT_TEXTA('orderedJobNumber', '66mm', '30mm', '16mm', '4mm', checkJobNumber);
            Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
            Lodop.ADD_PRINT_TEXT('66mm', '43mm', '12mm', '4mm', '护士:');
            Lodop.ADD_PRINT_TEXTA('nurseJobNumber', '66mm', '45mm', '10mm', '4mm', nurseJobNumber);
            Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
            Lodop.ADD_PRINT_TEXTA('csonfigRemarkInfo', '66mm', '54mm', '12mm', '4mm', `${curMed}/${medLength}`);
            Lodop.SET_PRINT_STYLEA(0, 'Alignment', 3);
            Lodop.NewPageA();
            };
            while (curCount * 4 < detailItem.detailPrintDTOList.length) {
            // 明细标签
            medPrint(1);
            medPrint(2);
            curCount += 1;
            }
            console.log('===done 379', data);
            
          } else { // 普通 TPN
            console.log('普通 -=-= TPN', detailItem.specialDrugs);
            //Lodop.SET_PRINT_PAGESIZE(1, '75mm', '72mm', 'HZCZ');
            // Lodop.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", 1);
            // Lodop.SET_PRINT_MODE("FULL_HEIGHT_FOR_OVERFLOW", 1);
            const { locationName, bedNumber, patientName, medicalRecordNo, sex, age, configTime, curMed, medLength, executivePlanDate } = patientInfo;
            const { frequency, frequencyExecutive, useage, everyoneOrderGroupNoUuid, dropletNum, dropletNumUnit, configRemarkInfo, configStorageRequire, staticConfig, sendBatchName, printFlag, chemoImg, checkJobNumber, orderedJobNumber, nurseJobNumber, liquidVolume, specialDrugs, orderRemark } = detailItem;
            var curCount = 0;
            const pageSum = detailItem.detailPrintDTOList.length / 4 + (detailItem.detailPrintDTOList.length % 4 > 0 ? 1 : 0);
            while (curCount * 4 < detailItem.detailPrintDTOList.length) {
              if (curCount !== 0 && curCount * 4 < detailItem.detailPrintDTOList.length) {
                Lodop.NewPageA();
              }
              // 明细标签
              Lodop.ADD_PRINT_TEXTA('locationName', '0mm', '0mm', '32mm', '5mm', locationName || '');
              Lodop.SET_PRINT_STYLEA(0, 'FontSize', 14);
              Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
              Lodop.ADD_PRINT_LINE('6mm', '0mm', '6mm', '30mm');
              Lodop.ADD_PRINT_TEXTA('bedNumber', '7mm', '-3mm', '13mm', '6mm', bedNumber || '');
              Lodop.SET_PRINT_STYLEA(0, 'FontSize', 14);
              Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
              Lodop.SET_PRINT_STYLEA(0, 'Alignment', 3);
              Lodop.ADD_PRINT_TEXT('7mm', '10mm', '3mm', '6mm', '床');
              Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
              Lodop.ADD_PRINT_TEXTA('patientName', '7mm', '14mm', '24mm', '6mm', patientName || '');
              Lodop.SET_PRINT_STYLEA(0, 'FontSize', 14);
              Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
              Lodop.ADD_PRINT_TEXTA('sex', '14mm', '0mm', '8', '5mm', sex || '');
              Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
              Lodop.ADD_PRINT_TEXTA('age', '14mm', '4mm', '9mm', '5mm', age || '');
              Lodop.ADD_PRINT_TEXTA('sendBatchName', '13mm', '12mm', '13mm', '5mm', sendBatchName);
              Lodop.SET_PRINT_STYLEA(0, 'FontSize', 12);
              Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
              Lodop.ADD_PRINT_TEXTA('staticConfig', '13mm', '24mm', '13mm', '5mm', `${staticConfig === 1 ? '配置' : '打包'}`);
              Lodop.SET_PRINT_STYLEA(0, 'FontSize', 11);
              Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
              Lodop.ADD_PRINT_BARCODE('0mm', '34mm', '22mm', '22mm', 'QRCode', everyoneOrderGroupNoUuid || '');
              Lodop.ADD_PRINT_TEXTA('medicalRecordNo', '0mm', '52mm', '25mm', '5mm', medicalRecordNo || '');
              Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
              Lodop.SET_PRINT_STYLEA(0, 'LineSpacing', -4);
              Lodop.ADD_PRINT_TEXTA('everyoneOrderGroupNoUuid', '5mm', '52mm', '25mm', '5mm', everyoneOrderGroupNoUuid || '');
              Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
              Lodop.SET_PRINT_STYLEA(0, 'LineSpacing', -4);
              Lodop.ADD_PRINT_TEXTA('printFlag', '10mm', '52mm', '18mm', '8mm', printFlag === 1 ? '重' : '');
              Lodop.SET_PRINT_STYLEA(0, 'FontSize', 20);
              Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);

              Lodop.ADD_PRINT_TEXTA('useage', '17mm', '0mm', '18mm', '4mm', useage || '');
              Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
              Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
              Lodop.ADD_PRINT_TEXTA('frequencyExecutive', '17mm', '16mm', '15mm', '4mm', frequencyExecutive || '');
              Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
              Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
              Lodop.ADD_PRINT_TEXTA('executivePlanDate', '17mm', '29mm', '38mm', '4mm', executivePlanDate || '');
              Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
              Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
              Lodop.ADD_PRINT_TEXT('17mm', '64mm', '10mm', '4mm', `${curCount + 1}/${pageSum}`);
              Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
              Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);

              Lodop.ADD_PRINT_LINE('21mm', '0mm', '21mm', '75mm');
              Lodop.ADD_PRINT_TEXT('22mm', '0mm', '30mm', '4mm', '药品/规格');
              Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
              Lodop.SET_PRINT_STYLEA(0, 'Alignment', 2);
              Lodop.ADD_PRINT_TEXTA('liquidVolume', '22mm', '35mm', '15mm', '4mm', `${liquidVolume ? (liquidVolume + 'ml') : ''}`);
              Lodop.ADD_PRINT_TEXT('22mm', '49mm', '12mm', '4mm', '剂量');
              Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
              Lodop.SET_PRINT_STYLEA(0, 'Alignment', 3);
              Lodop.ADD_PRINT_TEXT('22mm', '60mm', '12mm', '4mm', '数量');
              Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
              Lodop.SET_PRINT_STYLEA(0, 'Alignment', 3);
              Lodop.ADD_PRINT_LINE('26mm', '0mm', '26mm', '75mm');
              for (let medInd = 0; medInd < 4 && (curCount * 4 + medInd) < detailItem.detailPrintDTOList.length; medInd += 1) {
                const { medicationName, specification, dosage, dosageUnit, actualQuantity, unit, doseSmallPackageRatio, squareNotice, highRiskLevel, advice, selfMadeMedicine } = detailItem.detailPrintDTOList[curCount * 4 + medInd];
                Lodop.ADD_PRINT_TEXTA('medicationName', `${(medInd * 4) + 27}mm`, '0mm', '51mm', '4mm', `${advice ? '[嘱]' : ''}${selfMadeMedicine === 1 ? '[备]' : ''}${medicationName}${specification}` || '');
                Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
            if (advice || selfMadeMedicine) { Lodop.SET_PRINT_STYLEA(0, 'Bold', 1); Lodop.SET_PRINT_STYLEA(0, 'Underline', 1); Lodop.SET_PRINT_STYLEA(0, 'FontName', '黑体'); } 
                Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
                Lodop.ADD_PRINT_TEXTA('dosage', `${(medInd * 4) + 27}mm`, '45mm', '17mm', '4mm', `${dosage || ''}${dosageUnit}`);
                Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
                Lodop.SET_PRINT_STYLEA(0, 'Alignment', 3);
                Lodop.ADD_PRINT_TEXTA('actualQuantity', `${(medInd * 4) + 27}mm`, '59mm', '10mm', '4mm', `${actualQuantity || ''}${unit}`);
                Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
                Lodop.SET_PRINT_STYLEA(0, 'Alignment', 3);
                if (squareNotice === 1) {
                  Lodop.ADD_PRINT_RECT(`${(medInd * 4) + 27}mm`, '47mm', '15mm', '3.5mm');
                }
              }
              const html = `<div style='width: 100%; font-size: 14px; margin: 0; padding: 0; height: 22mm; font-weight: bold; overflow: hidden; font-family: 宋体'>
                <div>成品输液储存:${configStorageRequire || ''}</div>
                <span style='margin-right: 10px;'>${dropletNum || ''}${dropletNumUnit || ''}</span>
                <span>${configRemarkInfo || ''}</span>
                <div>医嘱备注:${orderRemark || ''}</div>
              </div>`;
              if (curCount === 0) {
                Lodop.ADD_PRINT_HTM('43mm', 0, '62mm', '22mm', html);
              }
              if (specialDrugs === 2) {
                Lodop.ADD_PRINT_TEXT('58mm', '58mm', '15mm', '7mm', 'TPN');
                Lodop.SET_PRINT_STYLEA(0, 'fontSize', 20);
                Lodop.SET_PRINT_STYLEA(0, 'Bold', 1);
                Lodop.SET_PRINT_STYLEA(0, 'Italic', 1);
                Lodop.SET_PRINT_STYLEA(0, 'FontName', '黑体');
                Lodop.SET_PRINT_STYLEA(0, 'FontColor', '#666');
              }


              Lodop.ADD_PRINT_LINE('65mm', '0mm', '65mm', '75mm', 2);
              Lodop.ADD_PRINT_TEXT('66mm', '0mm', '12mm', '4mm', '医生:');
              Lodop.ADD_PRINT_TEXTA('checkJobNumber', '66mm', '9mm', '16mm', '4mm', orderedJobNumber);
              Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
              Lodop.ADD_PRINT_TEXT('66mm', '22mm', '12mm', '4mm', '审方:');
              Lodop.ADD_PRINT_TEXTA('orderedJobNumber', '66mm', '30mm', '16mm', '4mm', checkJobNumber);
              Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
              Lodop.ADD_PRINT_TEXT('66mm', '43mm', '12mm', '4mm', '护士:');
              Lodop.ADD_PRINT_TEXTA('nurseJobNumber', '66mm', '45mm', '10mm', '4mm', nurseJobNumber);
              Lodop.SET_PRINT_STYLEA(0, 'FontSize', 10);
              Lodop.ADD_PRINT_TEXTA('csonfigRemarkInfo', '66mm', '54mm', '12mm', '4mm', `${curMed}/${medLength}`);
              Lodop.SET_PRINT_STYLEA(0, 'Alignment', 3);
              curCount = curCount + 1;
            }
            console.log('===done 378', detailItem);
            // this.props.myPrint.exejs(template, 'printData', printInfo, LODOP);
			// Lodop.NewPageA();
          }
          curMed_outer += 1;
        }
      }
    }
  }
}