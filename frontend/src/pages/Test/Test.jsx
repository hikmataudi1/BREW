import React, { useState ,useContext} from 'react';
import './Test.css';
import axios from 'axios';
import {StoreContext} from '../../context/StoreContext'
import ProductSuggestion from '../../components/ProductSuggestion/ProductSuggestion';


const Test = () => {

    const [ACount, setACount] = useState(0);
    const [BCount, setBCount] = useState(0);
    const [CCount, setCCount] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(7).fill(null));
    const [showResult, setShowResult] = useState(false);
    const {product_list , url} = useContext(StoreContext)
    const [category,setCategory]=useState("All")
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    
        const handleAnswer = (value, questionIndex) => {
        setSelectedAnswers((prev) => {
            const newAnswers = [...prev];
            const previousAnswer = newAnswers[questionIndex];
            if (previousAnswer) {
    
                switch (previousAnswer) {
                    case "A":
                        setACount((prev) => prev - 1);
                        break;
                    case "B":
                        setBCount((prev) => prev - 1);
                        break;
                    case "C":
                        setCCount((prev) => prev - 1);
                        break;
                    default:
                        break;
                }
            }
            newAnswers[questionIndex] = value;
            switch (value) {
                case "A":
                    setACount((prev) => prev + 1);
                    break;
                case "B":
                    setBCount((prev) => prev + 1);
                    break;
                case "C":
                    setCCount((prev) => prev + 1);
                    break;
                default:
                    break;
            }
            return newAnswers;
        });
    };
    const fetchSuggestedProducts = async (suggestionCategories)=>{
        try{
            const response = await axios.get(`${url}/api/product/suggest`,{
                params:{categories:suggestionCategories.join(',')}
            })
            
            setSuggestedProducts(response.data.products)
            console.log("suggested products:"+suggestedProducts);
            

        } catch(err){
            console.log("Error fetching suggested products" , err);
        }
    }
    const calculateResult = () => {
        let suggestionCategories
        if (ACount > BCount && ACount > CCount) {
            setCategory("A")
            suggestionCategories=["Moka pot"]
        } else if (BCount > ACount && BCount > CCount) {
            setCategory("B")
            suggestionCategories= ["French Press"];
        } else if (CCount > ACount && CCount > BCount) {
            setCategory("C")
            suggestionCategories = ["V60", "Chemex", "Syphon"];
        } else {
            setCategory("All")
            suggestionCategories=["V60" , "Moka Pot" , "French Press" , "Syphon" , "Sets"]
        }
        fetchSuggestedProducts(suggestionCategories)
        setShowResult(true);
        
    };

    const getResultMessage = () => {
        if (ACount > BCount && ACount > CCount) {
            return "Your ideal coffee equipment is a Moka Pot!";
        } else if (BCount > ACount && BCount > CCount) {
            return "Your ideal coffee equipment is a French Press or Drip Coffee Maker!";
        } else if (CCount > ACount && CCount > BCount) {
            return "Your ideal coffee equipment is a Pour-Over (V60 or Chemex) or Syphon Brewer!";
        } else {
            return "You have a balanced preference for various coffee styles!";
        }
    };
    const getResultParagraph = () => {
        if (ACount > BCount && ACount > CCount) {
            return "You're someone who enjoys a strong, intense coffee to jumpstart the day, without a lengthy process. The Moka Pot offers a rich, espresso-like flavor that's full-bodied and satisfying, perfect for quick, robust coffee at home. If you prefer even more convenience, an espresso machine could provide consistency and ease for your routine. You like coffee to be straightforward and impactful—no need for intricate steps, just a solid, flavorful cup that gets you ready to go";
        } else if (BCount > ACount && BCount > CCount) {
            return "You enjoy a coffee routine that brings comfort and quality without needing too much attention to detail. The French Press suits you well, delivering a bold, smooth coffee with rich flavors and a little hands-on satisfaction. If you prefer less involvement, a drip coffee maker gives you a great balance of convenience and quality. Your approach to coffee is about enjoying a flavorful, relaxed experience that fits seamlessly into your day, making both the French Press and drip coffee great choices.";
        } else if (CCount > ACount && CCount > BCount) {
            return "You re passionate about the coffee craft and value the nuances that different methods can reveal. The V60 pour-over allows you to fine-tune each brew, creating a light, clean cup where subtle flavors shine. If you prefer something that brings a little more ritual to your process, the Chemex offers a similar pour-over experience with a focus on smoothness and clarity. For an even more unique brew, the Syphon brewer adds an element of science, combining technique with a fascinating, theatrical experience. You love the journey of creating coffee as much as the final cup, making these methods perfect for your coffee artistry.";
        } else {
            return "You're someone who enjoys balanced coffee taste, just like your personality , you take just the right time to make your coffee with just the , It's hard to specify your coffee preference or what suits you best";
        }
    };

    const questions = [
        "How much time do you spend making coffee each morning?",
        "What kind of coffee do you prefer?",
        "Do you enjoy a hands-on approach when making coffee?",
        "How important is consistency in your coffee routine?",
        "How much space do you have in your kitchen?",
        "How much do you typically spend on coffee equipment?",
        "What kind of coffee experience do you prefer?"
    ];

    const answers = [
        ["Less than 5 minutes", "Around 10-15 minutes", "I enjoy taking my time, 20+ minutes is fine"],
        ["Strong and intense, like espresso", "Smooth and rich, with full body and flavor", "Light, clean, and subtle flavors"],
        ["I prefer minimal effort", "I like some involvement, but nothing too complex", "I love to get hands-on and enjoy the process"],
        ["Very important - I want the same result every time", "Consistency is nice, but I'm open to slight variations", "I appreciate unique results each time"],
        ["Very limited - I need compact equipment", "Some space - medium-sized equipment is fine", "Lots of space - I don't mind larger equipment"],
        ["I'm budget-conscious", "I'm willing to invest a bit for quality", "Price doesn't matter as long as it's high quality"],
        ["Quick and convenient, on-the-go", "A relaxed experience, enjoying a cup at home", "A ritual - I savor every step"]
    ];

    return (
        <>
        <div className='test-title'>
            <h2>Test your coffee preferences</h2>
            <h3>Know what suits you best</h3>
        </div>
        <div className="quiz-container">
            {questions.map((question, index) => (
                <div key={index} className='quest-container'>
                    <h3 className='ques'>{index + 1}. {question}</h3>
                    <div className='ans-container'>
                        {answers[index].map((answerText, answerIndex) => {
                            const answerValue = ["A", "B", "C"][answerIndex];
                            return (
                                <button 
                                    key={answerValue}
                                    className={`ans ${selectedAnswers[index] === answerValue ? "active" : ""}`}
                                    onClick={() => handleAnswer(answerValue, index)}
                                >
                                    {answerText}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
            <button onClick={calculateResult} className="submit-btn">See Your Result</button>
            {showResult && (
                <div className="result">
                    <p>{getResultMessage()}</p>
                    <h2>Let's help you finding your ideal Coffee equipment</h2>
                        <div className='product-suggestion'>
                        {suggestedProducts.length > 0 && suggestedProducts.map((item,index)=>(
                            <ProductSuggestion 
                            key={index} 
                            id={item._id} 
                            name={item.name} 
                            description={item.description} 
                            price={item.price} 
                            images={item.images} 
                            type={item.type} 
                            />                        
                            ))}
                        </div>
                    
                    <p>{getResultParagraph()}</p>
                </div>
            )}
        </div>
        </>
    );
};

export default Test;
