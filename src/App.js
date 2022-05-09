import React from 'react';
import { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion'

function App() {
  const [presVotes, setPresVotes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPresVotesData();
      console.log('Vote is Refreshed');
    }, 5000)
    return () => clearInterval(interval);

  }, [presVotes])

  const fetchPresVotesData = async () => {
    const data = await fetch('https://blob-prod-president.abs-cbn.com/feed-14/candidate-results-president.json');
    const apiResponse = await data.json();
    const sortedData = apiResponse.sort((a, b) => a.rank - b.rank)

    console.log(sortedData);
    setPresVotes(sortedData)
  }
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Real Time 2022 Live Unofficial Presidential Vote Count</h2>
          <h6 className='text-xs'>by Geo</h6>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div
            className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
          >
            <Reorder.Group values={presVotes} onReorder={setPresVotes}>
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Candidate Name
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Votes
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Rank
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >

                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >

                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >

                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {presVotes.map(votes =>
                    <Reorder.Item as='tr' key={votes.rank} value={votes.rank}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {votes.name}
                            </p>
                            <p className="text-gray-600 whitespace-no-wrap">{votes.candidateName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{votes.currentVoteCount.toLocaleString()}</p>
                        <p className="text-gray-600 whitespace-no-wrap">Votes</p>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-600 whitespace-no-wrap">{votes.rank}</p>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white w-full">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${votes.currentVoteCount / 300000}%` }}></div>
                      </td>

                    </Reorder.Item>
                  )}
                </tbody>
              </table>
            </Reorder.Group>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;