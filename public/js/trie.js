//list containing data in linear fashion
//const data = require("./facultyNames")

class trieNode{
    constructor(){
        this.terminationCount = 0; //marks the number of strings that end at a particular node
        this.childrenNodes = {} //stores the children of each trieNode
        this.facultyMatches = [] //contains data related to faculty with the matching name
    }
}

class trie {
    constructor(){
        this.root = new trieNode()
    }
    
    findNearMatches(baseNode,name,matches){
        let childrenNodes = baseNode.childrenNodes
        let childrenKeys  = Object.keys(childrenNodes)
        if(baseNode.terminationCount>0){
            console.log("near match found")
            console.log(name)
            console.log(baseNode.facultyMatches)
            matches = matches.concat(baseNode)
            console.log(matches)
        }

        for( const childKey of childrenKeys){
            this.findNearMatches(childrenNodes[childKey],name+childKey,matches)
        }
    }
    
    //method to allow searching for a particular string "q" in trie
    queryExact(q){ 
        let currentNode = this.root
        for(const character of q){
            if(Object.keys(currentNode.childrenNodes).includes(character)){
                currentNode =  currentNode.childrenNodes[character]
            }
            else{
                return null //match not found, ends query function here
            }
            //console.log(character)
        }
        
        return currentNode  //useful for other methods like query 
    }
    
    query(q){
        //search for the trie for given query first
        let baseNode = this.queryExact(q)
        
        if(!baseNode){  //checks first if an exact match even exists
            console.log(`${q} not found in trie`)
            return []
        }
        else{
            //then report exact matches first
            console.log(`${baseNode.terminationCount} exact matches of ${q} found in trie`)
            const results = baseNode.facultyMatches //adds exact matches if any to the results
            console.log("facultyMatches ", baseNode.facultyMatches);
            
            //then check children of currentNode to find near matches
            let matches = []
            for(let i=0;i<baseNode.terminationCount;i++){
                matches = matches.concat(baseNode.facultyMatches)
            }

            this.findNearMatches(baseNode,q,matches)
            console.log(matches)
            return matches
        }
        
    }
    
    //method to insert string s in trie
    insert(faculty){
        let currentNode = this.root
        for(const character of faculty.name){
            //checks if child node from corresponding character already exists
            if(Object.keys(currentNode.childrenNodes).includes(character)){
                //child node already exists
                //console.log(`child node already exists for character ${character}`)
            }
            else{
                //child node doesn't exist so new one has to be created
                //console.log(`child node had to be created for character ${character}`)
                currentNode.childrenNodes[character] = new trieNode()
            }
            
            //assigning current node to the next child node for the string s
            currentNode = currentNode.childrenNodes[character]
        }
        
        //increasing termination count for last child node where string ends
        currentNode.terminationCount += 1;
        currentNode.facultyMatches.push(faculty)
        console.log("insertion complete!")
        console.log(currentNode)
        
    }
    
    insertMultiple(data){
        for(const string of data){
            this.insert(string)
        }
    }
}


t= new trie()
t.insertMultiple(data)


// for(const x of data){
//     if(x.startsWith("MURUGAN")){
//         //console.log(x)
//     }
// }
//t.query("MURUGAN V")
// you can query for presence of any faculty name in records using t.query() here