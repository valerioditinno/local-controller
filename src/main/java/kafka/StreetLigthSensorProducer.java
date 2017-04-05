package kafka;

import java.util.Properties;

import kafka.javaapi.producer.Producer;
import kafka.producer.KeyedMessage;
import kafka.producer.ProducerConfig;

public class StreetLigthSensorProducer {
      
	private static Producer<String, String> producer;
    public final static String brokerList = "localhost:9092,localhost:9093";
    private static final String TOPIC = "StreetLigthSensorData";
      
    public void initialize() {
    	Properties props = new Properties();
        props.put("metadata.broker.list", brokerList);
        props.put("serializer.class", "kafka.serializer.StringEncoder");
        props.put("request.required.acks", "1");
        ProducerConfig config = new ProducerConfig(props);
        producer = new Producer<String, String>(config);
    }
       
    public void publish(String key, String message) {
    	KeyedMessage<String, String> data = new KeyedMessage<String, String>(TOPIC, key, message);
        producer.send(data);
    }
   
    public void closeProducer() {
        producer.close();
    }
   
}

/*
import java.util.*;
import kafka.consumer.Consumer;
import kafka.consumer.ConsumerConfig;
import kafka.consumer.ConsumerIterator;
import kafka.consumer.KafkaStream;
import kafka.javaapi.consumer.ConsumerConnector;

public class KafkaConsumer {
	
	private ConsumerConnector consumerConnector = null;
    private final String topic = "StreetLigthSensorData";

    public void initialize() {
    	Properties props = new Properties();
        props.put("zookeeper.connect", "localhost:2181");
        props.put("group.id", "testgroup");
        props.put("zookeeper.session.timeout.ms", "400");
        props.put("zookeeper.sync.time.ms", "300");
        props.put("auto.commit.interval.ms", "1000");
        ConsumerConfig conConfig = new ConsumerConfig(props);
        consumerConnector = Consumer.createJavaConsumerConnector(conConfig);
    }

    public void consume() {
        //Key = topic name, Value = No. of threads for topic
        Map<String, Integer> topicCount = new HashMap<String, Integer>();       
        topicCount.put(topic, new Integer(1));
        
        //ConsumerConnector creates the message stream for each topic
        Map<String, List<KafkaStream<byte[], byte[]>>> consumerStreams =
               consumerConnector.createMessageStreams(topicCount);         
        
        // Get Kafka stream for topic 'mytopic'
        List<KafkaStream<byte[], byte[]>> kStreamList =
                                              consumerStreams.get(topic);
        // Iterate stream using ConsumerIterator
        for (final KafkaStream<byte[], byte[]> kStreams : kStreamList) {
               ConsumerIterator<byte[], byte[]> consumerIte = kStreams.iterator();
               
               while (consumerIte.hasNext())
            	   System.out.println("Message consumed from topic [" + topic + "] : "       +new String(consumerIte.next().message()));              
        }
        //Shutdown the consumer connector
        if (consumerConnector != null)   consumerConnector.shutdown();          
   }

   public static void main(String[] args) throws InterruptedException {
        KafkaConsumer kafkaConsumer = new KafkaConsumer();
        // Configure Kafka consumer
        kafkaConsumer.initialize();
        // Start consumption
        kafkaConsumer.consume();
   }
}
 */