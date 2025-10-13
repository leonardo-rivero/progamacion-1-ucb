class Matrix{
    rows;
    close;
    data;
    constructor(rowsParam, colsParam, defaultValue){
        this.rows=rowsParam;
        this.cols=colsParam;
        this.data=[];

        for (let i=0 ; i<rowsParam; i++){
            const rowTemp =[];
            for(let j =0; j<colsParam; j++){
                rowTemp.push(defaultValue);
            }
            this.data.push(rowTemp)
        }
    }
    setValue(row, col, value){
        if(isvalidPosition(row, col)){
            this.data[row][col]=value;
        }
    }
    getValue(row, col){
        if(this.isvalidPosition(row,col)){
            return this.data[row][col];
        }else{
            return null
        }
        
    }
    fillRandom(min,max){
        for(let i=0; i<this.row; i++){
            for (let j=0; j<this.rows; j++){
                const random= Math.floor(Math.random()*(max-min+1))+min;
                this.data[i][j]=random;
            }
        }
    }
    ToString(){
        return this.data.map(row=>row.join('\t')).join('\n');
    }
}