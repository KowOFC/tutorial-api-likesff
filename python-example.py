#!/usr/bin/env python3
"""
Exemplo de uso da API de Likes Free Fire em Python
Este exemplo mostra como gerar uma API key e enviar likes
"""

import requests
import json
from typing import Dict, Optional

API_BASE_URL = 'http://localhost:3000/api'


class FreeFireLikesAPI:
    """Cliente Python para a API de Likes Free Fire"""
    
    def __init__(self, base_url: str = API_BASE_URL):
        """
        Inicializa o cliente da API
        
        Args:
            base_url: URL base da API
        """
        self.base_url = base_url
        self.api_key: Optional[str] = None
    
    def generate_api_key(self) -> str:
        """
        Gera uma nova API key
        
        Returns:
            API key gerada
            
        Raises:
            Exception: Se houver erro ao gerar a key
        """
        try:
            response = requests.post(f'{self.base_url}/generate-api-key')
            response.raise_for_status()
            
            data = response.json()
            
            if data['success']:
                self.api_key = data['data']['apiKey']
                print(f'✓ API Key gerada: {self.api_key}')
                return self.api_key
            else:
                raise Exception(data['message'])
                
        except requests.exceptions.RequestException as e:
            print(f'✗ Erro ao gerar API key: {e}')
            raise
    
    def send_likes(self, uid: str, region: str, access_token: str) -> Dict:
        """
        Envia likes para um usuário do Free Fire
        
        Args:
            uid: UID do usuário
            region: Região do servidor (BR, NA, SA, EU, AS, OC)
            access_token: Token de acesso
            
        Returns:
            Resposta da API
            
        Raises:
            Exception: Se não houver API key ou houver erro na requisição
        """
        if not self.api_key:
            raise Exception('API key não configurada. Execute generate_api_key() primeiro.')
        
        try:
            headers = {
                'Content-Type': 'application/json',
                'x-api-key': self.api_key
            }
            
            payload = {
                'uid': uid,
                'region': region,
                'accessToken': access_token
            }
            
            response = requests.post(
                f'{self.base_url}/send-likes',
                headers=headers,
                json=payload
            )
            response.raise_for_status()
            
            data = response.json()
            
            if data['success']:
                print('✓ Likes enviados com sucesso!')
                return data
            else:
                raise Exception(data['message'])
                
        except requests.exceptions.RequestException as e:
            print(f'✗ Erro ao enviar likes: {e}')
            raise
    
    def get_token(self) -> str:
        """
        Recupera o token salvo
        
        Returns:
            Token de acesso salvo
            
        Raises:
            Exception: Se não houver API key ou token salvo
        """
        if not self.api_key:
            raise Exception('API key não configurada. Execute generate_api_key() primeiro.')
        
        try:
            headers = {'x-api-key': self.api_key}
            
            response = requests.get(
                f'{self.base_url}/get-token',
                headers=headers
            )
            response.raise_for_status()
            
            data = response.json()
            
            if data['success']:
                token = data['data']['accessToken']
                print(f'✓ Token recuperado: {token}')
                return token
            else:
                raise Exception(data['message'])
                
        except requests.exceptions.RequestException as e:
            print(f'✗ Erro ao recuperar token: {e}')
            raise
    
    def check_health(self) -> Dict:
        """
        Verifica o status da API
        
        Returns:
            Status da API
        """
        try:
            response = requests.get(f'{self.base_url}/health')
            response.raise_for_status()
            
            data = response.json()
            
            if data['success']:
                print('✓ API está funcionando')
                print(f"  Status: {data['status']}")
                print(f"  Uptime: {data['uptime']} segundos")
                return data
            else:
                raise Exception('API não está respondendo corretamente')
                
        except requests.exceptions.RequestException as e:
            print(f'✗ Erro ao verificar status: {e}')
            raise


def main():
    """Exemplo de uso completo da API"""
    print('=== Exemplo de Uso da API ===\n')
    
    # Inicializa o cliente
    api = FreeFireLikesAPI()
    
    # 1. Verificar se a API está funcionando
    print('1. Verificando status da API...')
    api.check_health()
    print()
    
    # 2. Gerar uma API key
    print('2. Gerando API key...')
    api.generate_api_key()
    print()
    
    # 3. Enviar likes
    print('3. Enviando likes...')
    api.send_likes(
        uid='123456789',
        region='BR',
        access_token='seu-token-aqui'
    )
    print()
    
    # 4. Recuperar token salvo
    print('4. Recuperando token salvo...')
    try:
        api.get_token()
    except Exception as e:
        print(f'Nota: {e}')
    print()
    
    print('=== Exemplo concluído! ===')


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(f'Erro fatal: {e}')
        exit(1)
