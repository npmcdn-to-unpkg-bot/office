<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;
use Cake\Auth\DefaultPasswordHasher;
class Location extends Entity
{

    
    protected $_accessible = [
        '*' => true,
        'id' => false,
    ];

  
   
}
