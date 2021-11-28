pipeline {
    
    agent any
    tools{nodejs "node"}

    stages{
        stage('Build'){
            steps {
                sh 'npm install'
            }
        }
        stage('Build Image'){
            steps {
                sh 'npm run build'
            }
        }
    }
}