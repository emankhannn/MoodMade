// App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Layout, Typography, Button, Row, Col } from 'antd';
import MoodSelect from './MoodSelect';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const App = () => {
  const [mood, setMood] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!mood) {
      return alert('Please select your mood!');
    }
    setLoading(true);
    try {
      // Make sure your backend returns { quranAyah, seerahMotivation, worldlyMotivation, meditationExercise, ... }
      const { data } = await axios.post('http://127.0.0.1:5000/api/mood', { mood });
      setResponse(data);
    } catch (error) {
      alert('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <Content style={{ padding: '20px' }}>
        <Title level={1} style={{ textAlign: 'center' }}>
          MoodMade
        </Title>
        <Paragraph style={{ textAlign: 'center' }}>
          Select your mood and get personalized content
        </Paragraph>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <MoodSelect value={mood} onChange={(value) => setMood(value)} />
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            style={{ marginLeft: '10px' }}
          >
            Submit
          </Button>
        </div>

        {response && (
          <Row gutter={[16, 16]} justify="center">
            {/* Box 1 - Quranic Ayah */}
            <Col span={24}>
              <div
                style={{
                  background: '#ffe58f',
                  padding: '20px',
                  textAlign: 'center'
                }}
              >
                <Title level={3}>Quranic Ayah</Title>
                <Paragraph>{response.quranAyah}</Paragraph>
              </div>
            </Col>

            {/* Box 2 - Motivation from Seerah */}
            <Col span={24}>
              <div
                style={{
                  background: '#b7eb8f',
                  padding: '20px',
                  textAlign: 'center'
                }}
              >
                <Title level={3}>Motivation from Seerah</Title>
                <Paragraph>{response.seerahMotivation}</Paragraph>
              </div>
            </Col>

            {/* Box 3 - Worldly Motivation */}
            <Col span={24}>
              <div
                style={{
                  background: '#91d5ff',
                  padding: '20px',
                  textAlign: 'center'
                }}
              >
                <Title level={3}>Worldly Motivation</Title>
                <Paragraph>{response.worldlyMotivation}</Paragraph>
              </div>
            </Col>

            {/* Box 4 - Meditation Exercise */}
            {response.meditationExercise && (
              <Col span={24}>
                <div
                  style={{
                    background: '#ffa39e',
                    padding: '20px',
                    textAlign: 'center'
                  }}
                >
                  <Title level={3}>Meditation Exercise</Title>
                  <Paragraph>{response.meditationExercise}</Paragraph>
                </div>
              </Col>
            )}
          </Row>
        )}
      </Content>
    </Layout>
  );
};

export default App;
