const express = require('express')
const mysql = require('mysql2');

const cors = require("cors");
const app = express()
const port = 3000;

app.use(cors())
app.use(express.json());

// Napraviti web scrape ili nesto da importam podatke o receptima u bazu
// UI dizajn
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpass',
    database: 'recipes',
})
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });
app.get('/', (req, res) => {
    const sqlQuery = "SELECT * FROM recipe";
    
    connection.query(sqlQuery,(err,result)=>{
        if(err){
            console.error("Error when executing query: ",err);
            res.staus(500).send('Internal server error');
            return;
        }
        console.log("test")
        console.log(result);
    
        res.status(200).json(result)
    })  
})
app.post('/getIds',(req,res)=>{
    //console.log("Ing: ",req.body);
    const ingFromFrontend = req.body.ingFromFrontend;
    const lowerdIngFromFrontend = ingFromFrontend.map(e=>e.toLowerCase())
    console.log("Ing: ",lowerdIngFromFrontend);
    const query = "SELECT id, ingredientName FROM ingredient WHERE LOWER(ingredientName) IN (?)";
    connection.query(query,[lowerdIngFromFrontend],(error,result)=>{
        if(error){
                console.log(error);
                res.status(500).send('Internal server error');
        }else{
            const mappedIds = result.map((i)=>i.id);
            res.status(200).send(mappedIds);
            /*const ingredientIdMap = new Map(result.map(({ name, id }) => [name.toLowerCase(), id]));
            const backendIngredientIds = ingFromFrontend.map(ingredient => ingredientIdMap.get(ingredient.toLowerCase()));
            res.json(backendIngredientIds);*/
        }
    })
});
app.post('/compareData',(req,res)=>{
   
    const frontendIds = req.body.frontendIds;
    const query = `
    SELECT recipeId, GROUP_CONCAT(ingredientId ORDER BY ingredientId) AS ingredientIds
        FROM recipeingredients
        GROUP BY recipeId;

    `;
  
    connection.query(query,[frontendIds, frontendIds.length],(error,result)=>{
        if(error){
            console.log("Error happened");
            console.log(error)
            res.status(500).send("Internal server error");
            return;
        } 
        const recipeIngredientMap = {};
        result.forEach(row=>{
            const recipeId = row.recipeId ;
            const ingredientIds= row.ingredientIds.split(",").map(Number);
            recipeIngredientMap[recipeId] = ingredientIds;
        })
      
       const arrayOfRecipeIds =[];
       function finalMap(id,arr){
                this.id = id
                this.arr = arr
       }
        Object.keys(recipeIngredientMap).forEach(el=>{
            const ingredientIdsMap = recipeIngredientMap[el];
            const isIdentical = frontendIds.sort().join(',')===ingredientIdsMap.sort().join(',');
            const isSubset = ingredientIdsMap.length < frontendIds.length && ingredientIdsMap.every(id => frontendIds.includes(id))
            if(isIdentical || isSubset ){
                let temp = new finalMap(Number(el),ingredientIdsMap)
                arrayOfRecipeIds.push(temp);
            }
            //console.log(ingredientIdsMap)
        })
        console.log("Great success: ",arrayOfRecipeIds)
        res.status(200).send(arrayOfRecipeIds)
    
    })
    
    
})
app.post("/returningRecipesData",(req,res)=>{
   
    /*const givenRecipeIds = req.body.recipeIds;
    console.log("Given recipes: ",givenRecipeIds)
    let tempRecipeIdContainer=[];
    givenRecipeIds.forEach(el=>{
        tempRecipeIdContainer.push(el.id);
       
    })
    const query = "SELECT recipeName FROM recipe WHERE ID IN (?) ";
    //const secondQuery = "SELECT ingredientName FROM ingredient WHERE ID IN(?)";
    connection.query(query,[tempRecipeIdContainer],(error,result)=>{
        if(error){
            console.log("Error happened");
            res.status(500).send("Internal server error");
            return;
        }   
      
        const recipes = result;
        //console.log("Recipes: ",recipes)
        res.status(200).send(recipes);
    })*/
    const givenRecipeIds = req.body.recipeIds;
    const query = "SELECT recipeName,recipeDescription,recipeSteps,image FROM recipe WHERE ID = ?";
    let recipes = [];
    function finalMap(recipeName,desc,steps,image,arr){
        this.recipeName = recipeName
        this.desc = desc;
        this.steps = steps;
        this.image = image;
        this.arr = arr
}
    givenRecipeIds.forEach((el)=>{
        const tempRecipeId = el.id;
        connection.query(query,[tempRecipeId],(error,result)=>{
            if(error){
                console.log("Error happened: ",error);
                res.status(500).send("Internal server error");
                return;
            } 
            //console.log("Opis recepta: ",result[0]);
            const temp = new finalMap(result[0].recipeName,result[0].recipeDescription,result[0].recipeSteps,result[0].image,el.arr)
            recipes.push(temp);
            if(recipes.length===givenRecipeIds.length){
                //console.log("Recipes: ",recipes);
                res.status(200).send(recipes);
            }  
        })
    })

})
app.post("/returningIngredientData", async (req, res) => {
    const givenIngIds = req.body.ingDataIds;
    console.log("Opis recepta: ",givenIngIds)
    const query = "SELECT ingredientName FROM ingredient WHERE ID = ?";
    
    function finalRecipeObject(recipeName,desc,steps,image,ingredientName) {
        this.recipeName = recipeName;
        this.desc = desc;
        this.steps = steps;
        this.image = image;
        this.ingredientName = ingredientName;
    }

    let recipes = [];

    try {
        for (const element of givenIngIds) {
            const tempIng = element.arr;
            const ingredientNameArray = [];

            for (const elIds of tempIng) {
                const tempIngId = elIds;
                const result = await new Promise((resolve, reject) => {
                    connection.query(query, [tempIngId], (error, result) => {
                        if (error) {
                            console.log("Error happened: ", error);
                            reject(error);
                            return;
                        }
                        resolve(result[0].ingredientName);
                    });
                });

                ingredientNameArray.push(result);
            }

            const tempObject = new finalRecipeObject(element.recipeName, element.desc,element.steps,element.image,ingredientNameArray);
            recipes.push(tempObject);
        }

        //console.log("Final recipes and ing: ", recipes);
        res.status(200).send(recipes);
    } catch (error) {
        console.log("Error occurred: ", error);
        res.status(500).send("Internal server error");
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})