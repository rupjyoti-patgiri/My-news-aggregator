import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardHeader, CardContent } from './components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
// import ThemeToggle from "./components/ui/ThemeToggle";
import { Search, RefreshCw } from 'lucide-react';
import axios from 'axios';

const fetchNews = async (category) => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=YOUR_API_KEY`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('general');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState('us');


  const categories = ["general" ,"technology", "sports", "business", "health", "entertainment", "science"];

  const countries = ["us", "in", "it", "jp", "kr"]


  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=cfde58c7b36d48e0a121e5ab57ecf62d`
        );
        console.log(`Fetching news for ${category}:`, response.data);
        setNews(response.data.articles);
      } catch (err) {
        console.error('Error fetching news:', err);
        if (err.response) {
          setError(`Error: ${err.response.data.message}`);
        } else {
          setError('Network error. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);


  const handleSearch = () => {
    // Filter news based on search query
    const filteredNews = news.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setNews(filteredNews);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <header className="p-4 bg-white shadow-md sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Personalized News Aggregator</h1>
        {/* <ThemeToggle /> */}
        <div className="flex gap-2">
          <Input
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-80"
          />
          <Button onClick={handleSearch} className="flex items-center gap-1">
            <Search size={18} /> Search
          </Button>
        </div>
      </header>


      <main className="flex-grow px-4 sm:px-12 py-8">
        <Tabs value={category} onValueChange={setCategory}> 

              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat} activeTab={category} setActiveTab={setCategory}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)} {/* Capitalize */}
                </TabsTrigger>
              ))}

            
            <TabsContent value={category}>
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {news.map((article, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <h3 className="text-lg font-bold">{article.title}</h3>
                      </CardHeader>
                      <CardContent>
                        <img src={article.urlToImage} alt="article_image" />
                        <p className="text-sm">{article.description}</p>

                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Read More
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-blue-600 text-white py-4 text-center">
        <p>&copy; 2025 Personalized News Aggregator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

