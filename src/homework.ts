// ***************** Этот файл можно удалить если он вам не подходит или не нужен. ***************** 
// *************************************************************************************************



/* 
1.
Создать декоратор метода addItemInfoDecorator он должен добавлять поле date в 
возвращаемом объекте с датой когда был вызван метод а также поле info в котором 
будет записан текст состоящий из названия товара и его цены 
например: ‘Apple iPhone - $100’;
Для того что бы функция была вызвана в правильном контексте внутри декоратора ее нужно
 вызывать через apply let origResult =  originalFunc.apply(this);
*/

function addItemInfoDecorator(target: Object, method: string, descriptor: PropertyDescriptor): void {
    let origFunc: any = descriptor.value;
    descriptor.value = function(){
        let resOrigFunc = origFunc.apply(this);             
        resOrigFunc.date = new Date().toLocaleString();
        resOrigFunc.info = `Item ${this.name} - ${this.price}$`
        return resOrigFunc;
    }
}

class Item {
    public price: number;
    public name: string;

    constructor(name: string ,price: number) {
        this.name = name;
        this.price = price;
    }

    @addItemInfoDecorator
    public getItemInfo() {
        return {
            name: this.name, 
            price: this.price
        };
    }
}

let item = new Item('Apple', 100);
// console.log(item.getItemInfo());



/*
2.
Создать декоратор класса User. Он должен добавлять в данном классе поле createDate 
датой создания класса а также добавлять поле type в котором будет записана строка 
‘admin’ или ‘user’ данную строку нужно передать в декоратор при вызове. Сам класс и 
имя декоратора может быть произвольным.
*/
function checkNameType(nameType:string): boolean | Error {
    if (nameType === "admin" || nameType === "user"){
        return true;
    } else 
        throw new Error('not propriate data, use admin or user instead');
}

function userExtension(type: string){
    checkNameType(type);
    return function(targetClass){
        return class{
            public type:string= type;
            public createDate:string = new Date().toLocaleString();
        }
    }
}

@userExtension('admin')
class User{
}

let user:User = new User();
// console.log(user);


/*
3.
Есть два апи для получения и работы с новостями одно для 
получения новостей из USA второе из Ukraine. 
Под эти апи создано по два интерфейса и по два класса. 
Переделайте это в namespaces.
*/
// News api USA

namespace USA{
    export interface INews {
        id: number;
        title: string;
        text: string;
        author: string;
    }
    
    export class NewsService {
        protected apiurl: string = 'https://news_api_usa_url'
        public getNews() {} // method
    }
}


// News api Ukraine
namespace Ukraine{
    export interface INews2 {
        uuid: string;
        title: string;
        body: string;
        author: string;
        date: string;
        imgUrl: string;
    }
    
    export class NewsService2 {
        protected apiurl: string = 'https://news_api_2_url'
        public getNews() {} // method get all news
        public addToFavorite() {} // method add to favorites
    }
}

// let usa = new USA.NewsService();
// let ua:Ukraine.NewsService2 = new Ukraine.NewsService2();

//4 Задание
/*
Есть два класса Junior и Middle создайте класс Senior который будет имплементировать 
этих два класса а также у него будет еще свой метод createArchitecture реализация 
данного метода может быть произвольной.
*/

class Junior {
    public doTasks(): void {
        console.log('Actions!!!');
    }
}

class Middle {
    public createApp(): void {
        console.log('Creating!!!');
    }
}

class Senior implements Junior, Middle {
    public doTasks: ()=>void;
    public createApp:()=>void;
    public createArchitecture():void{
        console.log('method created in Senior class');        
    }
}

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}

applyMixins(Senior, [Junior, Middle]);

// let senior:Senior = new Senior();

